import { db } from "./db";
import { faker } from "@faker-js/faker";
import argon from "argon2";
import { FileType, Role } from "./generated/prisma";

async function main() {
  await db.user.deleteMany();
  // Delete posts and projects first
  await db.postTag.deleteMany();
  await db.post.deleteMany();
  await db.projectTag?.deleteMany?.();
  await db.project?.deleteMany?.();

  await db.tag.deleteMany();
  await db.user.deleteMany();
  const passwordHash = await argon.hash("qP1^Kt9X");

  // Create users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const avatar = await db.file.create({
        data: {
          originalName: faker.system.commonFileName("jpg"),
          size: faker.number.int({ min: 1000, max: 50000 }),
          url: faker.image.avatar(),
          objectKey: faker.string.uuid(),
          fileType: FileType.IMAGE,
          uploader: {
            create: {
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              passwordHash,
              bio: faker.person.bio(),
              role: Role.USER,
              isActive: true,
            },
          },
        },
        include: { uploader: true },
      });

      return await db.user.update({
        where: { id: avatar.uploader.id },
        data: { avatarFileId: avatar.id },
      });
    })
  );

  // Create tags
  const tags = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      db.tag.create({
        data: {
          name: `Tag-${i + 1}`,
        },
      })
    )
  );

  // Create posts
  for (let i = 0; i < 15; i++) {
    const author = users[i % users.length];
    const cover = await db.file.create({
      data: {
        originalName: faker.system.commonFileName("jpg"),
        size: faker.number.int({ min: 1000, max: 50000 }),
        url: faker.image.urlLoremFlickr({ category: "nature" }),
        objectKey: faker.string.uuid(),
        fileType: FileType.IMAGE,
        uploader: { connect: { id: author.id } },
      },
    });

    const post = await db.post.create({
      data: {
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        excerpt: faker.lorem.sentences(2),
        content: faker.lorem.paragraphs(3),
        isPublished: i % 2 === 0,
        isFeatured: i % 3 === 0,
        publishDate: new Date(),
        authorId: author.id,
        coverImageId: cover.id,
      },
    });

    const tagCount = faker.number.int({ min: 1, max: 3 });
    const usedTags = faker.helpers.arrayElements(tags, tagCount);

    for (const tag of usedTags) {
      await db.postTag.create({
        data: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    }
  }

  // Create projects
  for (let i = 0; i < 15; i++) {
    const author = users[i % users.length];
    const cover = await db.file.create({
      data: {
        originalName: faker.system.commonFileName("jpg"),
        size: faker.number.int({ min: 1000, max: 50000 }),
        url: faker.image.urlLoremFlickr({ category: "nature" }),
        objectKey: faker.string.uuid(),
        fileType: FileType.IMAGE,
        uploader: { connect: { id: author.id } },
      },
    });

    const project = await db.project.create({
      data: {
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentences(2),
        content: faker.lorem.paragraphs(3),
        isPublished: i % 2 === 0,
        isFeatured: i % 3 === 0,
        publishDate: new Date(),
        authorId: author.id,
        coverImageId: cover.id,
        codeUrl: faker.internet.url(),
        liveUrl: faker.internet.url(),
      },
    });

    const tagCount = faker.number.int({ min: 1, max: 3 });
    const usedTags = faker.helpers.arrayElements(tags, tagCount);

    for (const tag of usedTags) {
      await db.projectTag.create({
        data: {
          projectId: project.id,
          tagId: tag.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

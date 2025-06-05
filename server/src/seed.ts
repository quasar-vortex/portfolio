import { db } from "./db";
import { faker } from "@faker-js/faker";
import argon from "argon2";
import { FileType, Role } from "./generated/prisma";
import { deleteFileByKey } from "./upload";
import logger from "./logger";

const initTags = [
  "Linux",
  "Networking",
  "ReactJS",
  "Node.JS",
  "TailwindCSS",
  "SSH",
  "AWS",
  "S3",
  "Log Analysis",
];
async function main() {
  logger.info("Running Seed Script");
  try {
    await db.user.deleteMany();
    logger.info("Deleted Users");
    // Delete posts and projects first
    await db.postTag.deleteMany();
    logger.info("Deleted Post Tags");
    await db.post.deleteMany();
    logger.info("Deleted Posts");
    await db.projectTag?.deleteMany?.();
    logger.info("Deleted Project Tags");
    await db.project?.deleteMany?.();
    logger.info("Deleted Projects");
    await db.tag.deleteMany();
    logger.info("Deleted Tags");
    await db.user.deleteMany();
    logger.info("Deleted Users");
    const foundFiles = await db.file.findMany();

    // clean up files from s3
    await Promise.all(
      foundFiles.map(async (file) => {
        return await deleteFileByKey(file.objectKey);
      })
    );
    logger.info(`Deleted Files From S3`);

    await db.file.deleteMany();
    logger.info(`Deleted Files From DB`);
  } catch (error) {
    console.error("Somethin Went Wrong");
    process.exit();
  }

  const passwordHash = await argon.hash("qP1^Kt9X");

  logger.info(`Creating Users`);
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

  logger.info(`Creating Tags`);
  await db.tag.createMany({
    data: initTags.map((t) => ({ name: t })),
  });
  const tags = await db.tag.findMany();
  logger.info(`Creating Posts`);
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

  logger.info(`Creating Projects`);
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

  logger.info(`Finished Seeding`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

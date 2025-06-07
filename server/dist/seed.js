"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const faker_1 = require("@faker-js/faker");
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("./generated/prisma");
const upload_1 = require("./upload");
const logger_1 = __importDefault(require("./logger"));
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
    logger_1.default.info("Running Seed Script");
    try {
        await db_1.db.user.deleteMany();
        logger_1.default.info("Deleted Users");
        // Delete posts and projects first
        await db_1.db.postTag.deleteMany();
        logger_1.default.info("Deleted Post Tags");
        await db_1.db.post.deleteMany();
        logger_1.default.info("Deleted Posts");
        await db_1.db.projectTag?.deleteMany?.();
        logger_1.default.info("Deleted Project Tags");
        await db_1.db.project?.deleteMany?.();
        logger_1.default.info("Deleted Projects");
        await db_1.db.tag.deleteMany();
        logger_1.default.info("Deleted Tags");
        await db_1.db.user.deleteMany();
        logger_1.default.info("Deleted Users");
        const foundFiles = await db_1.db.file.findMany();
        // clean up files from s3
        await Promise.all(foundFiles.map(async (file) => {
            return await (0, upload_1.deleteFileByKey)(file.objectKey);
        }));
        logger_1.default.info(`Deleted Files From S3`);
        await db_1.db.file.deleteMany();
        logger_1.default.info(`Deleted Files From DB`);
    }
    catch (error) {
        console.error("Somethin Went Wrong");
        process.exit();
    }
    const passwordHash = await argon2_1.default.hash("qP1^Kt9X");
    logger_1.default.info(`Creating Users`);
    const users = await Promise.all(Array.from({ length: 5 }).map(async () => {
        const avatar = await db_1.db.file.create({
            data: {
                originalName: faker_1.faker.system.commonFileName("jpg"),
                size: faker_1.faker.number.int({ min: 1000, max: 50000 }),
                url: faker_1.faker.image.avatar(),
                objectKey: faker_1.faker.string.uuid(),
                fileType: prisma_1.FileType.IMAGE,
                uploader: {
                    create: {
                        firstName: faker_1.faker.person.firstName(),
                        lastName: faker_1.faker.person.lastName(),
                        email: faker_1.faker.internet.email(),
                        passwordHash,
                        bio: faker_1.faker.person.bio(),
                        role: prisma_1.Role.USER,
                        isActive: true,
                    },
                },
            },
            include: { uploader: true },
        });
        return await db_1.db.user.update({
            where: { id: avatar.uploader.id },
            data: { avatarFileId: avatar.id },
        });
    }));
    logger_1.default.info(`Creating Tags`);
    await db_1.db.tag.createMany({
        data: initTags.map((t) => ({ name: t })),
    });
    const tags = await db_1.db.tag.findMany();
    logger_1.default.info(`Creating Posts`);
    for (let i = 0; i < 15; i++) {
        const author = users[i % users.length];
        const cover = await db_1.db.file.create({
            data: {
                originalName: faker_1.faker.system.commonFileName("jpg"),
                size: faker_1.faker.number.int({ min: 1000, max: 50000 }),
                url: faker_1.faker.image.urlLoremFlickr({ category: "nature" }),
                objectKey: faker_1.faker.string.uuid(),
                fileType: prisma_1.FileType.IMAGE,
                uploader: { connect: { id: author.id } },
            },
        });
        const post = await db_1.db.post.create({
            data: {
                title: faker_1.faker.lorem.sentence(),
                slug: faker_1.faker.lorem.slug(),
                excerpt: faker_1.faker.lorem.sentences(2),
                content: faker_1.faker.lorem.paragraphs(3),
                isPublished: i % 2 === 0,
                isFeatured: i % 3 === 0,
                publishDate: new Date(),
                authorId: author.id,
                coverImageId: cover.id,
            },
        });
        const tagCount = faker_1.faker.number.int({ min: 1, max: 3 });
        const usedTags = faker_1.faker.helpers.arrayElements(tags, tagCount);
        for (const tag of usedTags) {
            await db_1.db.postTag.create({
                data: {
                    postId: post.id,
                    tagId: tag.id,
                },
            });
        }
    }
    logger_1.default.info(`Creating Projects`);
    for (let i = 0; i < 15; i++) {
        const author = users[i % users.length];
        const cover = await db_1.db.file.create({
            data: {
                originalName: faker_1.faker.system.commonFileName("jpg"),
                size: faker_1.faker.number.int({ min: 1000, max: 50000 }),
                url: faker_1.faker.image.urlLoremFlickr({ category: "nature" }),
                objectKey: faker_1.faker.string.uuid(),
                fileType: prisma_1.FileType.IMAGE,
                uploader: { connect: { id: author.id } },
            },
        });
        const project = await db_1.db.project.create({
            data: {
                title: faker_1.faker.lorem.sentence(),
                slug: faker_1.faker.lorem.slug(),
                description: faker_1.faker.lorem.sentences(2),
                content: faker_1.faker.lorem.paragraphs(3),
                isPublished: i % 2 === 0,
                isFeatured: i % 3 === 0,
                publishDate: new Date(),
                authorId: author.id,
                coverImageId: cover.id,
                codeUrl: faker_1.faker.internet.url(),
                liveUrl: faker_1.faker.internet.url(),
            },
        });
        const tagCount = faker_1.faker.number.int({ min: 1, max: 3 });
        const usedTags = faker_1.faker.helpers.arrayElements(tags, tagCount);
        for (const tag of usedTags) {
            await db_1.db.projectTag.create({
                data: {
                    projectId: project.id,
                    tagId: tag.id,
                },
            });
        }
    }
    logger_1.default.info(`Finished Seeding`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => db_1.db.$disconnect());

"use client";

import Link from "next/link";
import { Project } from "./projectcard";

const ProjectsTable = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 font-semibold">Title</th>
            <th className="px-4 py-2 font-semibold">Author</th>
            <th className="px-4 py-2 font-semibold">Tags</th>
            <th className="px-4 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map(({ id, title, author, ProjectTag }) => (
            <tr
              key={id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-2">{title}</td>
              <td className="px-4 py-2">{author.firstName}</td>
              <td className="px-4 py-2">
                {ProjectTag?.map((item) => item.tag.name).join(" , ")}
              </td>
              <td className="px-4 py-2">
                <Link
                  href={`/dash/posts/edit/${id}`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;

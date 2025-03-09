import { getAllProjects } from "@/actions/project"
import React from "react"

const DashBoardPage = async () => {
  const projects = await getAllProjects()
  return (
    <div className="w-full flex felx-col gap-6 relative">
      <div className="flex flex-col-reverse items-start w-full 
      gap-6 sm:flex-row sm:jusify-between sm:items-center">
      <div className="flex flex-col items-start gap-2">
      <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
          Projects
        </h1>
        <p className="text-base font-normal dark:text-secondary"> All your work on one place</p>
      </div>
      </div>
      {/* Projects */}
    </div>
  )
}

export default DashBoardPage

import { containerVairants } from "@/lib/constants"
import { Project } from "@prisma/client"
import {motion} from 'framer-motion'
import React from "react"
import ProjectCard from "../project-card"

type Props = {
    projects :Project[]

}
const Projects =({projects}:Props)=>{
    return <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid=cols-4 gap-4"
    variants={containerVairants}
    initial="hidden"
    animate="visible"
    >

        {projects.map((project) => (
            <ProjectCard
                key={project.id}
                projectId={project.id}
                title={project.title}
                createdAt={project.createdAt.toString()}
                isDelete={project.isDeleted}
                slideData={project.slides}
                src={project.thumbnail || 'https://unsplash.com/photos/a-pile-of-coins-sitting-on-top-of-each-other-1kFmEbec1nQ'}
            />
        ))}
        
    </motion.div>
}

export default Projects
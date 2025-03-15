"use server"

import { onAuthenticateUser } from "./user"
import { client } from "@/lib/prisma"
export const getAllProjects = async () => {
  try{
    const checkUser = await onAuthenticateUser()
    if(checkUser?.status !== 200 || !checkUser?.user) {
      return {
        status: 403,
        error: "User not Authenticated"
      }
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy:{
        updatedAt : "desc"
      }
    })
    if(projects.length === 0){
      return {
        status: 404,
        error: "No projects found"
      }
    }
    return {
      status: 200,
      projects: projects
    }
  } catch(error) {
    return {
      status: 500,
      error: "Internal Server Error"
    }
  }
}

export const getRecentProjects = async () => {
  try{
    const checkUser = await onAuthenticateUser()
    if(checkUser?.status !== 200 || !checkUser?.user) {
      return {
        status: 403,
        error: "User not Authenticated"
      }
    }
    const recentProjects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy:{
        updatedAt : "desc"
      },
      take: 5
    })
    if(recentProjects.length === 0){
      return {
        status: 404,
        error: "No recent projects found"
      }
    }
    return {
      status: 200,
      projects: recentProjects
    }
  } catch(error) {
    return {
      status: 500,
      error: "Internal Server Error"
    }
  }
}


export const RecoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser()
    if (!checkUser || checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" }
    }

    const updatedProject = await client.project.update({
      where :{
        id:projectId,
      },
      data :{
        isDeleted : false,
      }
    })

    if(!updatedProject){
      return {status :500, error:'Failed to recover project'}
    }
    return {status:200 , data:updatedProject}

  } catch (error) {
    return { status: 500, error: "Internal Server Error" }
  }
}

export const deleteProject = async (projectId:string) =>{
  try{
    const checkUser = await onAuthenticateUser()
    if (!checkUser || checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" }
    }
    const updatedProject = await client.project.update({
      where :{
        id:projectId,
      },
      data :{
        isDeleted : true,
      }
    })

    if(!updatedProject){
      return {status :500, error:'Failed to delete project'}
    }
    return {status:200 , data:updatedProject}

  }catch(error){
    console.error('ERROR',error)
    return { status:500,error:"Internal server error"}
  }
}
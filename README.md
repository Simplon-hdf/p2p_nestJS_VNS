# ***Pire2Pire.com*** : An online training platform 

**TABLE OF CONTENTS**
* [**Description**](#1-description)
* [**Detailed content**](#2-detailed-content)
    - [Visible part](#visible-content)
    - [Managing part](#managing-content)
* [**Technologies**](#3-technologies)
    - [PostgreSQL](#postgresql)
    - [TypeORM](#typeorm)
    - [NestJS](#nestjs)
* [**Project status**](#4-project-status)
* [**Sources**](#5-sources)

## **1. Description**

**What is Pire2pire.com ?**
Pire2pire.com is an online training platform center where students can register and follow trainings, chapters and lessons. <br>

The website also has a trainer part which allows (for users that has the trainer role) to create trainings, chapters and modules and assign them tags.

Once a student finish an online course, he can set it as done, increasing the completion gauge of a training. A training is completed when every chapters has been marked as completed.

**Current project objective:**
Create an API that allows to interact with a database and manage a few entities by modifying routes thanks to a controller and tools like Postman.

## **2. Detailed content**
We had to create two different type of content :
- Visible content that can be read by everyone (ex: chapters, lessons).
- Managing content that organize and restrict (ex: tag, permissions).

### **Visible content**
Currently, there is only three content that students and trainers can read :
- **Training**: Each training contains one or more chapters and has a title and a completion gauge, increasing depending of the number of chapters completed.
- **Chapters**: Each chapters contains one or more lessons. It also has a title, a description and a duration.
- **Lessons**: Defined with a title, a goal (what's the objective of the lesson) and a subject (what you'll learn in that lesson).

They all have an active state that determines whether the website can show them or to disable them if they no longer are relevants.

To easily search a training, a chapter or a lesson, **tags** will be added to them. The main purpose of a tag is to organize more effectively the website content and to help doing researchs (With a... research bar!)

### **Managing content**
Do you remember that we talked about students and trainers ? Well, that means we need to create a few things :
- **Users account** : 
Users such as students will need to follow and check lessons or modules in order to progress and pass examinations courses (for instance).
There are also trainers that need to create trainings, chapters and lessons. All those things require an account system.
- **Roles** : As said above, there is students and trainers, which are the main roles. However, we also need administrators to manage the site and the other roles. 
- **Permissions** : They help to organize who's allowed to do what. For example, students can't create lessons.

## **3. Technologies**

### **PostgreSQL**

### **TypeORM**

### **NestJS**

## **4. Project status**

## **5. Sources**
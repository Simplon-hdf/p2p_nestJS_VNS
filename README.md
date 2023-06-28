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
* [**Ressources**](#5-ressources)

## **1. Description**

**What is Pire2pire.com ?**
Pire2pire.com is an online training platform center where students can register and follow trainings, chapters and lessons. <br>

The website also has a trainer part which allows (for users that has the trainer role) to create trainings, chapters and modules and assign them tags.

Once a student finish an online course, he can set it as done, increasing the completion gauge of a training. A training is completed when every chapter has been marked as completed.

**Current project objective:**
Create an API that allows to interact with a database and manage a few entities by modifying routes thanks to a controller and tools like Postman.

## **2. Detailed content**
We had to create two different types of content:
- Visible content that can be read by everyone (ex: chapters, lessons).
- Managing content that organize and restrict (ex: tag, permissions).

### **Visible content**
Currently, there is only three contents that students and trainers can read:
- **Training**: Each training contains one or more chapters and has a title and a completion gauge that increase depending of the number of chapters completed.
- **Chapters**: Each chapter contains one or more lessons. It also has a title, a description and a duration.
- **Lessons**: Defined with a title, a goal (what's the objective of the lesson) and a subject (what you'll learn in that lesson).

They all have an active state that determine whether the website can show them or to disable them when they no longer are relevants.

To easily search a training, a chapter or a lesson: **tags** will be added to them. The main purpose of a tag is to organize more effectively the website content and to help doing researchs (With a... research bar!)

### **Managing content**
Do you remember that we talked about students and trainers ? Well, that means we need to create a few things:
- **Users account** : 
Users such as students will need to follow and check lessons or modules in order to progress and pass examinations courses (for instance).
There are also trainers that need to create trainings, chapters and lessons. All those things require an account system.
- **Roles** : As said above, there are students and trainers, which are the main roles. However, we also need administrators to manage the site and the other roles. 
- **Permissions** : They help to organize who's allowed to do what. For example, students can't create lessons.

## **3. Technologies**
The choice of the technologies was mainly up to us. However, we were given a few recommendations. 
<br> 
In the end, we decided to use PostgreSQl, typeORM and NestJS. What lead us to choose them was... curiosity! Plus, that's also because they really are efficients, well-documented and used by a lot of peoples.

### **PostgreSQL**
Postgre is an open-source **relational database management system**. Its advantages are a huge data consistency and integrity.

Most of us were using MySQL for our previous projects but PostgreSQL has gotten an incredible increase of popularity. So why not learning it. 

### **TypeORM**
TypeORM is an **object-relational-mapping** (ORM). It is used as an intermediate between an application with an object oriented programming langage and a database. <br> 
<!-- We can see it as the one that receives the desires of the user throught the application and convert it in a request to check into the database, get the desired informations or apply modifications and convert it back to be used. -->

Why using it ? High popularity, easy to use with NestJS and really scalable to work with many different sizes of applications. 
<br> It's not difficult to create database tables and update them since it's automatic with TypeORM. Thats perfect for our small project.

### **NestJS**
NestJS is a **framework** used to build server side web applications. It uses TypeScript and has the advantage of being able to create scalable applications.

NestJS allows rapid development, predictable and readable code thanks to its atomicity. In that project, we use the NestJS functionalities in pair with TypeORM on a model-view-controller project. We really find it clear and efficient, notably with the decorators that make the treatment of the routes organised and clean.

## **4. Project status:** What's done ?
**Database connection:**
TypeORM can interact with the PostgreSQL database and create tables from the models defined in our entities (Where each entity is a table in the database).

**Database relations:**
We have managed several types of relations between the tables, such as OneToMany, ManyToOne and ManyToMany. When we update the values of one side of a relation, the other side is automatically updated (thank you TypeORM).

**Interactions with the application:**
Currently, we can interact with the application by using custom routes. <br>
We made the basic CRUD (Create, Read, Update and Delete) operations for every entity and, by defining methods and using the NestJS decorators, we can pass parameters in a route and/or adding a body to our request by using Postman. That allows us to interact with the application and trigger methods that will return or update our database.
<br>
In order to reach that level of interaction, we had to create a controller, a service and a repository for every entity and write methods to receive parameters and use them to create a custom request.

**Advanced interactions:** 
Furthermore, by using a custom route, we can trigger more advanced methods. For example, we made it possible to:
- Update relations between tables
- Show and get relations (ex: get all the chapters contained in a training)
- Search a training, chapter or lesson by typing a few letters (useful for a search bar)
- Soft delete elements : make them inactives without deleting them in the database (ex: deleted user become an anonyme user)

## **5. Ressources**
- [ManyToMany relations (doc)](https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations)
- [Deprecated EntityRepository](https://stackoverflow.com/questions/71557301/how-to-workraound-this-typeorm-error-entityrepository-is-deprecated-use-repo) We choose to replace the deprecated EntityRepository by a Service-like Repository.
- [Create entities (doc)](https://orkhan.gitbook.io/typeorm/docs/entities)
- [ChatGPT](https://openai.com/blog/chatgpt) For answering many questions and giving precious examples
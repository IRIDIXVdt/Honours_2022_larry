### Setup Instructions
Hello, and welcome to this manual. I will guide you through how to setup this environment on your device for future development.

The question set is stored on Firestore, but you can access the local copy at question_collection folder.

### Node.js environment setup 
All the project files are under cs_sm2_demo2.
The project is developed using Angular + Ioinc. Angular and Ionic are frameworks for Node.js Therefore, you need to install node to run this project.

1. Start by following instructions to install Node.js [here](https://nodejs.org/en)

2. After you have installed Node.js, navigate to <code>cs_sm2_demo2</code> folder, and run <pre>npm install</pre>

3. Now, you should have the node_module folder ready

### Local Dev Server
This part of the manul is derived from [ionic's offical documentation on command reference](https://ionicframework.com/docs/cli/commands/serve)

Start a local dev server for app dev/testing

<pre>ionic serve [options]</pre>

<cite>
Easily spin up a development server which launches in your browser. It watches for changes in your source files and automatically reloads with the updated build. 

By default, <code>ionic serve</code> boots up a development server on localhost. To serve to your LAN, specify the <code>--external</code> option, which will use all network interfaces and print the external address(es) on which your app is being served.

<code>ionic serve</code> uses the Angular CLI. Use <code>ng serve --help</code> to list all Angular CLI options for serving your app. See the <code>ng serve</code> [docs](https://angular.io/cli/serve) for explanations. Options not listed below are considered advanced and can be passed to the Angular CLI using the -- separator after the Ionic CLI arguments. See the examples.

</cite>

### Website Project Structure
All the code for website development is under the <code>cs_sm2_demo2/src</code> folder.

#### Notes:
- <code>src/app/shared/service</code> contains all the service code such as firebase service, local-storage service, and alert service
- <code>src/app/account</code>contains everything for the account page
- <code>src/app/demo02</code>contains everything for the daily task page

### Website deployment with Firebase
Firebase is "Google's mobile platform that helps you quickly develop high-quality apps and grow your business." You can find its official documentations [here](https://firebase.google.com/docs)

This project is already deployed as a Progressive Web Application in Angular. Therfore, after you are provided access to Firestore project, you only need the two following commands to deploy the website

- <code>ionic build --prod</code> to build an optimized version of the app
- <code>firebase deploy</code> to deploy the app

If you want to store the deployment from scratch, here's some help [resources](https://ionicframework.com/docs/angular/pwa#making-your-angular-app-a-pwa)

### Question Generation and Distribution
You need to be given admin access to insert questions into the system from the website. See <code>src/app/shared/guard</code>for more information

You can also update question list directly on Firestore database. It is store under <code>QuestionCollection</code>. You can find a local copy of the lastest list at K<code>./question_collection/COSC_211.txt</code>
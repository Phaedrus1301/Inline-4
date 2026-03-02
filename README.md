# Inline-4 StarterKit - Fastify, NestJs, Handlebars, Tailwindcss
Well, I love Bikes and Cars and I got this idea to make a project without all the noisy frontend bs and since its powered by 4 main things, I couldn't help but call it inline-4 with hopes that it is lightweight and performative.

Its a starterkit project, build over Nest.Js starter project. Mostly this is only for my own use- I am just fucking around and finding out if this is really a bad idea or not. It uses Fastify web framework, Handlebars for handling all the frontend and Tailwindcss because well, who likes barebones css anyway?

How to run the project - 
- `git clone https://github.com/Phaedrus1301/Inline-4.git`
- `cd Inline-4`
- `pnpm install`
- `pnpm run start -- -b swc` this builds tailwindcss file and then starts the nest server.
- go to `http://localhost:3000` and there you have your kit running.
> **NOTE** : I know Inline-4 is not the best of names, what you can do is clone the repo and then rename the folder to something generic like `MyForum` or whatever BEFORE running any pnpm steps. It should be fine that way. The name in package.json is still `starterkit`

Call me hater but man frontend is so much full of slop I feel, I wanted to escape all that and build something rather simple with backend serving most of the static stuff and having only small amounts of reactivity.
I think if I pair this with Ajax (which I am going to try in project I will build from this kit) it should be more or less fine. Lets see how that works out.

Q. Why Nest?

A. I have been learning about .NET in regards to Web for sometime and Nest is closes to it, easier for me to get into and I think backend really needs some organisation at the level which Nest provides, plus its all TypeScript so win win.

Q. Why Handlebars?

A. I bumped into them in nest docs, seems fairly simple and fairly minimalistic so why not? I guess I will try it out and see.

Q. How did I get Tailwindcss working with Backend framework?

A. Bit tricky- 
- Run `pnpm add -D tailwindcss @tailwindcss/cli`
- Run `pnpx tailwind-cli init` that generates the `tailwind.config.js` file.
- modified it to add all `.hbs` files from my `views` folder. 
- Create `assets/tailwind.css` and `/public` folder.
- Run `pnpx tailwindcss-cli -i ./assets/tailwind.css -o ./public/main.css` this generates `main.css` for your project.
- Adding `public` folder to static assets so Nest will serve them as such. Code - 
```javascript
app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
```
- Finally going to your `index.hbs` file and adding ref to main.css `<link rel="stylesheet" href="/public/main.css">` and testing out Tailwindcss `<span class="text-7xl">`.\
and Voila! there you are- all your pages will have Tailwind css working. I have put `--minify` flag always in build and prod version both, you can change that if you feel like it. please generate your own main.css as starter kit won't have it.

> **NOTE** : You will always have to run the build command for Tailwindcss first and then run your nest app or else it ofcourse wont show the latest updates. I have updated the scripts to first run twcss build and then nest app. unfortunately I dont think I can run both on watch as of now but I will try and see if I can find something.

I will be using this to build atleast 1 website.
I am always a newbie to web dev, feel free to point out any mistakes, provide any tips or improvement. If you read the whole thing, thanks for your time.

# Front End Engineer Code Assessment for Rec

## How to View App

The app is currently hosted at [rec.jacobrico.com](rec.jacobrico.com). You can run the end to end application from this URL. You can also find the URL in the github main page for the codebase. The backend is also hosted [on rec-server](https://rec-server-nf5j.onrender.com). If you want to run the backend locally, you can follow the instructions at [the github page for the server](https://github.com/jedwardrico/rec-server).

## How to Run Locally

To run locally, you can run:

### `yarn start`

It will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Run Tests

In the project directory, you can run:

### `yarn test`

It will launch the test runner in the interactive watch mode.

## Questions

#### An explanation of anything you skipped, as well as any trade-offs or shortcuts you took.

I only added baseline testing due to time constraints. If allotted more time, I would more thoroughly test some of the rendering functions. I also skipped in-depth error handling. There is some very basic error handling, but I would ideally clean that up and create a global error handling wrapper for API errors (5XXs) and add some visual notifications in the form of a toast or header style notification. I made some tradeoffs in how a structured the application. I could make the formatting and filtering functions more reusable and move them out of their repective component files. I also could have moved the geolocation getter func into a util file as well.

#### What you would do if you wanted to make this project "production-ready"?

I would add more extensive testing. Make sure that all components and functions in components are covered. I would move all of the filtering and data manipulation (distance calculations) from the API call into the backend code. Have seperate endpoints for getting different types of data. We should not be doing that heavy of filtering/data manipulation on each render if possible. I would clean up the design a bit. Make it flow just a bit better. I would also add a CI/CD pipeline to our repos to make sure that test suites are run before merging to main and also to automate deploys.

#### A paragraph or two describing what you think the most impactful 1-2 features would be to build next if this app was real.

I would add a map option. For food trucks it is always nice to be able to see what is nearby and also if there are other food trucks in the area. Especially if you are trying to go out with multiple people, it is nice to see if there are multiple options in the vicinity. We could use open an open API like [OpenStreetMap](https://wiki.openstreetmap.org/wiki/API) since we already have lat/long data, it would be a quick win to add to the UX.

I would also add a way to filter by food type. Right now we just show 3 places that are open, but I don't want to have to click through a bunch of cuisines that I don't like in order to find the right place. Adding a food type filter would also be a quick feature add that is low on dev time, but high on user needs fufilled.

## Final Thoughts

Overall I thought this was a fun exercise. It was nice to be able to learn about the haversine distance calculations add see how that works in other apps. There are a multitude of things that I would like to add to this quick app and I could keep adding for weeks, but I wanted to be able to timebox myself to fit within the requirements.

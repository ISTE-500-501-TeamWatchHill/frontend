# Board Game Project - Frontend

### Clone the repo
`git clone https://github.com/ISTE-500-501-TeamWatchHill/frontend.git && cd ./frontend`

### Getting Node packages
`npm i`

You'll probably want to run this command everytime you pull. If you're unable to run the repository, it could be because you're missing some of the needed packages.

### Setting up your `.env` file
`cp .env.example .env`

This command copies the example file and create a new .env file for the frontend repo. Double check you have all of the correct variables set.

The `REACT_APP_BASE_URL` in the frontend .env file needs to have a matching port number with whatever port you have it running on the backend. By default, the backend runs on PORT=3001 unless you specify another port in the backend .env file with PORT=####. Without this properly setup, none of the fetch requests to the backend will work.

### To run the app
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## To setup the backend repo...
Navigate to [https://github.com/ISTE-500-501-TeamWatchHill/backend](https://github.com/ISTE-500-501-TeamWatchHill/backend)

Follow all instructions listed there.

## If you have any problems with setup...
Please contact Aaron Putterman (abp6318@rit.edu)

# Testing
`yarn run cypress open`

This will start the frontend tests, so long as you have the frontend running in another terminal. Please message Alexis for a more in-depth explaination for running within the tool, modifying existing, and create new tests.


# Other

### Creating new components
`./new_component.sh <name_of_component_lowercase>`

This will create a new directory with a JavaScript and corresponding CSS Module. Check that the name of the files and name of the component in the JavaScript file is what you want it to be.

### Getting Started

- Local: run `yarn` to install dependencies and than `yarn start` to run locally
- Build app: run `yarn package` to create an app build

### Overview

On Track is a desktop application for macOS built with the Electron framework as well as the electron-react-boilerplate template. The application allow the user to be more deliberate with how they spend time throughout the week. There are 3 sections: today's goals, kudos and tomorrow's goals. Users can add current day goals as well as add tomorrow's goals. The goals added for tomorrow will automatically be present in the next day's current goals section. This allows the user to quickly pick off an item of the list without spending time thinking about what needs to be accomplished for the day. In addition to that, users can click on a goal to mark it as finished and enjoy the satisfaction as their goal list becomes smaller. Finally, there is a kudos section which allows the user to reflect and make note what they are proud of for the day. This is particularly important as we sometimes forget to acknowledge the things which went well in the presence of a mountain of to-dos.

![Screen Shot 2021-05-07 at 7 33 15 PM](https://user-images.githubusercontent.com/43521582/117517815-3de96700-af6b-11eb-9722-a8279b7c0e40.png)

### Additonal Notes

- Used styled components for css styling
- Leveraged the Observer pattern to notify front-end components of changes in data
- Utilized electron-store module to store data after app has exited

### Reflection
This was my first attempt with the electron framework and with developing desktop apps in general. In my opinion, it is a pretty cool framework which makes development easy to get off the ground and one can apply web dev knowledge to make a desktop app!😄

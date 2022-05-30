export const constants = {
  APP_URL: "https://tcc-focus-api.herokuapp.com",
  events: {
    PARTICIPANTS_NEW: "/participant/new",
    LOGIN: "/auth/authenticate",
    SEND_ANSWER: "/answer/newList",
    MY_ROOMS: "/room/my",
    NEW_ROOM: '/room/createRoom',
    EDIT_ROOM: '/room/edit',
    ACTIVATE: '/activate',
    DESACTIVATE: '/desactivate',
    DASHBOARD: '/room/data'
  },
  questionList: [
    "How did you feel about the challenges of the activity?",
    "How did you feel about your skills in the activity?",
    "Is the activity important to you?",
    "Do you feel alert?",
    "Do you feel happy?",
    "Do you feel active?",
    "How well were you concentrating?",
  ],
  legend: [
    "Stimulated",
    "Able",
    "Important",
    "Alert",
    "Happy",
    "Active",
    "Involved",
  ],
  text: {
    fields: {
      enterRoom: {
        name: "Name",
        studentId: "Identifier",
        roomId: "Room code",
        button: "Sign in",
      },
      newRoom: {
        name: "Room name",
        description: "Description",
        button: "Create",
      },
      editRoom: {
        name: "Room name",
        minInterval: "Minimum time interval",
        maxInterval: "Maximum time interval",
      },
      login: {
        email: "E-mail",
        password: "Password",
        button: "Login",
      },
    },
    message: {
      errors: {
        enterRoom: {
          nameRequired: "Input name",
          charLimit20: "20 characteres limit",
          charLimit7: "7 numbers limit",
          studentIdRequired: "Input Id",
          roomIdRequired: "Input Room code",
          notfound: "Room not found!",
          closed: "Closed Room",
        },
        editRoom: {
          nameRequired: "Input name",
          charLimit20: "20 characteres limit",
          charLimit7: "7 numbers limit",
          studentIdRequired: "Input Id",
          roomIdRequired: "Input Room code",
          notfound: "Room not found!",
          closed: "Closed Room",
        },
        login: {
          emailRequired: "Input e-mail",
          passRequired: "Input password",
          charLimit30: "30 characteres limit",
          charLimit20: "20 characteres limit",
        },
      },
    },
  },
};

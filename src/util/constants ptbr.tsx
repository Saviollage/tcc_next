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
    "Sente-se estimulado/desafiado pela atividade?",
    "Sente-se capaz/hábil de realizar a atividade?",
    "A atividade é importante para você?",
    "Alerta",
    "Feliz",
    "Ativo",
    "Envolvido",
  ],
  legend: [
    "Estimulado",
    "Capaz",
    "Importante",
    "Alerta",
    "Feliz",
    "Ativo",
    "Envolvido",
  ],
  text: {
    fields: {
      enterRoom: {
        name: "Nome",
        studentId: "Matrícula",
        roomId: "Código da sala",
        button: "Entrar",
      },
      newRoom: {
        name: "Nome da Sala",
        description: "Descrição",
        button: "Criar sala",
      },
      editRoom: {
        name: "Nome da Sala",
        minInterval: "Intervalo mínimo",
        maxInterval: "Invtervalo máximo",
      },
      login: {
        email: "Email",
        password: "Senha",
        button: "Entrar",
      },
    },
    message: {
      errors: {
        enterRoom: {
          nameRequired: "Favor digitar seu nome",
          charLimit20: "Limite 20 caracteres",
          charLimit7: "Limite 7 números",
          studentIdRequired: "Favor digitar sua matricula",
          roomIdRequired: "Favor digitar código da sala",
          notfound: "Sala não encontrada",
          closed: "Sala fechada",
        },
        editRoom: {
          nameRequired: "Favor digitar seu nome",
          charLimit20: "Limite 20 caracteres",
          charLimit7: "Limite 7 números",
          studentIdRequired: "Favor digitar sua matricula",
          roomIdRequired: "Favor digitar código da sala",
          notfound: "Sala não encontrada",
          closed: "Sala fechada",
        },
        login: {
          emailRequired: "Favor digitar seu email",
          passRequired: "Favor digitar sua senha",
          charLimit30: "Limite 30 caracteres",
          charLimit20: "Limite 20 caracteres",
        },
      },
    },
  },
};

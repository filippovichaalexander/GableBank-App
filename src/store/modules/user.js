export default{
  state : {
    user : false,
    token : false,
    refresh_token : false,
  },
  actions : {
    async singUp(context, data) { // fetch всегда асинхронный !!, либо можно исплдьзовать .then // context это весь store
      const res = await fetch('https://money.aprograms.ru?class=User&action=reg', {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      // if (res.ok) {
      //   console.log('Вы успешно зарегестрированы') //Можно сделать alert вы успешно зарагестрировались
      //   return res.ok                               // return всегда в конце функции,после него ничего нет, это break
      // } else {
      //   console.log('Такой пользователь уже зарестрирован')
      //   return false // проверка на дубликат пользователья происходит на бэке 
      // }
      return res.ok;
     },
     
     async signIn(context, data) {
      const res = await fetch('https://money.aprograms.ru?class=User&action=auth', {
        method: 'POST',
        headers: {
          "Content-Type" : "appication/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      if (res.ok) { // 200
        let result = await res.json(); //  result это уже объект от сервера
        context.commit("setUser", result);
      }
      return res.ok;
    },
  },
  mutations : {
    setUser(state, data) {   // всегда принимают state  setUser меняет изначальное состояние state пробрасыват из fetch данные
      state.user = data.user;
      state.token = data.Access_token;
      state.refresh_token = data.Refresh_token;  //rtok - используется для получения token
    },
  },
  getters : {
    token: state => state.token
  }
}
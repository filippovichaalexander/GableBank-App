export default {
  state : {
    categories : false
  },
  actions : {
    async getCategories(context) {
      const res = await fetch('https://money.aprograms.ru?class=Category&action=get')
      if (res.ok) { // 200
        let result = await res.json(); //  result это уже объект от сервера
        context.commit("setCategories", result);
      }
      return res.ok;
    },
    async addCategory(context, data) { // fetch всегда асинхронный !!, либо можно исплдьзовать .then // context это весь store
      data = {
        ...data,
        auth : context.getters.token
      };
      const res = await fetch('https://money.aprograms.ru?class=User&action=add', {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      if (res.ok) { // 200
        let result = await res.json(); //  result это уже объект от сервера
        context.dispatch("getCategories", result);
      }
      return res.ok;
  },
},
  mutations : {
    setCategories(state, data) {
      state.categories = data
      console.log(data);
    }
  },
  getters : {
    categories : state => state.categories
  }
}
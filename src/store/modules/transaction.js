export default {
  state : {
    transactions: [],
  },
  actions : {
  async add_transaction(context, data) {
    data = {
      ...data,
      auth : context.getters.token
    };
    const res = await fetch('https://money.aprograms.ru?class=Transaction&action=add', {  // await из асинхронности делает синхронность, вставляет в линейный поток
      method: 'POST',
      headers: {
        "Content-Type" : "appication/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) { // 200
      let result = await res.json(); //  result это уже объект от сервера
      context.dispatch("getWallets");
    }
    return res.ok;
  },
  async getTransactions(context) {
    const res = await fetch('https://money.aprograms.ru?class=Wallet&action=get_all', {
    method: 'POST',
    headers: {
      "Content-Type" : "appication/json;charset=utf-8"
    },  
    body: JSON.stringify({auth: context.getters.token})
  })
  if (res.ok) { // 200
    let result = await res.json(); //  result это уже объект от сервера
    context.commit("setTransactions", result); 
  }
  return res.ok;
}
},
  mutations : {
    setTransactions(state, data) {
      state.transactions = data
    }
    
  },
  getters : {
  }
}
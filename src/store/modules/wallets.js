export default {
  state : {
    wallets: false,
    currencies: ['RUB', 'USD', 'BGN', 'MVR', 'TWD']
  },
  actions : {
    async addWallet(context, data) {
      data = {
        ...data,
        auth : context.getters.token
      };
      const res = await fetch('https://money.aprograms.ru?class=Wallet&action=add', {
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
    async getWallets(context) {
      let data = {auth : context.getters.token};
      const res = await fetch('https://money.aprograms.ru?class=Wallet&action=get', {
        method: 'POST',
        headers: {
          "Content-Type" : "appication/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      if (res.ok) { // 200
        let result = await res.json(); //  result это уже объект от сервера
        context.commit("setWallets", result);
      }
      return res.ok;
    },
    async deleteWallet(context, id) {
      let data = {
        id,
        auth: context.getters.token
      };
      const res = await fetch('https://money.aprograms.ru?class=Wallet&action=remove', {
        method: 'DELETE',
        headers: {
          "Content-Type" : "appication/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      if (res.ok) { // 200
        let result = await res.json(); //  result - объект от сервера
        // console.log(result);                   // приходит 1 - можно не писать
  
        // const newWallets = this.wallets.filter(wallet => wallet.id !== id)
        // this.wallets = newWallets;
  
        context.dispatch("getWallets");
      }
      return res.ok;
    },
    async editWallet(context, data) {
      data = {
        ...data,
        auth : context.getters.token    
      };
      const res = await fetch('https://money.aprograms.ru?class=Wallet&action=change', {
        method: 'PUT',
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
  },
  mutations : {
    setWallets(state, data){
      state.wallets = data;
    },
  },
  getters : {
    wallet : state => id => 
    (state.wallets && state.wallets.find(wallet => Number(wallet.Id) == Number(id))) 
    ? state.wallets.find(wallet => Number(wallet.Id) == Number(id)) : false,
    wallets: state => state.wallets,
    currencies: state => state.currencies
  },
}
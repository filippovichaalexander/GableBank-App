import { createStore } from "vuex";

const store = createStore({

  state: {
    preloader: true,

    user : false,
    token : false,
    refresh_token : false,
    wallets: false,
    allCurrencies: false,
    lastTransactions: false

  },
  actions: {
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
      console.log(result);
      context.commit("setUser", result);
    }
    return res.ok;
  },

  async addWallet(context, data) {
    data = {
      ...data,
      auth : context.state.token
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
      console.log(result);
      context.dispatch("getWallets");
    }
    return res.ok;
  },
  async getWallets(context) {
    let data = {auth : context.state.token};
    const res = await fetch('https://money.aprograms.ru?class=Wallet&action=get', {
      method: 'POST',
      headers: {
        "Content-Type" : "appication/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) { // 200
      let result = await res.json(); //  result это уже объект от сервера
      console.log(result);
      context.commit("setWallets", result);
    }
    return res.ok;
  },
  async deleteWallet(context, id) {
    let data = {
      id,
      auth: context.state.token
    };
    const res = await fetch('https://money.aprograms.ru?class=Wallet&action=remove', {
      method: 'DELETE',
      headers: {
        "Content-Type" : "appication/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) { // 200
      let result = await res.json(); //  result это уже объект от сервера
      console.log(result);                   // приходит 1 - можно не писать

      // const newWallets = this.wallets.filter(wallet => wallet.id !== id)
      // this.wallets = newWallets;

      context.dispatch("getWallets");
    }
    return res.ok;
  },
  async editWallet(context, data) {
    data = {
      ...data,
      auth : context.state.token    
    };
    const res = await fetch('https://money.aprograms.ru?class=Wallet&action=put', {
      method: 'PUT',
      headers: {
        "Content-Type" : "appication/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) { // 200
      let result = await res.json(); //  result это уже объект от сервера
      console.log(result);
      context.dispatch("getWallets");
    }
    return res.ok;
  },
  // create transaction
  async transact(context, data) {
    data = {
      ...data,
      auth : context.state.token
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
      console.log(result);
      context.dispatch("getWallets");
    }
    return res.ok;
  }
},
  mutations: {
    setUser(state, data) {   // всегда принимают state  setUser меняет изначальное состояние state пробрасыват из fetch данные
      state.user = data.user;
      state.token = data.Access_token;
      state.refresh_token = data.Refresh_token;  //rtok - используется для получения token
      console.log("Авторизация прошла успешно");
    },

    // createNewBankAccount(state, newBankAccount) {
    //   state.bankAccounts.push([...state.bankAccounts, newBankAccount])
    //   console.log("Новый счёт добавлен");
    // },
    setWallets(state, data){
      state.wallets = data;
      console.log("Кошельки обновлены", state.wallets);
    }
  },
  getters: {
    wallet : state => id => state.wallets.find(wallet => Number(wallet.Id) == Number(id)),

    recipient : state => recipientName => state.recipients.find(recipient.Name === recipientName),
    transactions: function() {this.wallet.transactions},
    allCurrencies: state => state.allCurrencies
}
});

export default store;
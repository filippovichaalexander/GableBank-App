import { createStore } from "vuex";

const store = createStore({

  state: {
    preloader: true,

    user : false,
    token : false,
    refresh_token : false,
    wallets: false,
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
  async getLastTansactions(context, data) {
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
    // getWalletTitle : (state) => (walletId) => {
    //   console.log("кошелек", state.wallets.filter(wallet => wallet.Id === walletId))
    //   console.log("кошелек1", state.wallets[0]);
    //   console.log("кошелек2", state.wallets[1]);
    //   console.log("Айди", walletId)
    //   return state.wallets.filter(wallet => wallet.Id === walletId);
    // },
    getWalletTitle : (state) => (walletId) => {
      console.log("кошельки", state.wallets)
        return state.wallets.forEach((wallet) => {
        console.log("кошелек из стора", wallet.Id)
        console.log("кошелек из компоненты", walletId)
        if(wallet.Id === walletId) {
          console.log("кошелек if", wallet)
          return wallet
        }
        else {
          console.log("кошелек else", wallet)
        }
      });      
    }
  }
});

export default store;
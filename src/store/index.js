import { createStore } from "vuex";

import wallets from "./modules/wallets";
import categories from "./modules/categories";
import user from "./modules/user";

const store = createStore({

  state: {
    preloader: true,
    // categories : false,
    transactedCategories: false,
    user : false,
    token : false,
    refresh_token : false,
    // wallets: false,
    allCurrencies: false, transactions: [],
    lastTransactions: false,
    
    currencies: ['RUB', 'USD', 'BGN', 'MVR', 'TWD']

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
      auth : context.state.token    
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
  // create transaction
  async add_transaction(context, data) {
    data = {
      ...data,
      auth : context.getters.token
    };
    const res = await fetch('https://money.aprograms.ru?class=Transaction&action=add', {
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
    body: JSON.stringify({auth:context.state.token})
  })
  if (res.ok) { // 200
    let result = await res.json(); //  result это уже объект от сервера
    context.commit("setTransactions", result); 
  }
  return res.ok;
}
  
},
  mutations: {
    setUser(state, data) {   // всегда принимают state  setUser меняет изначальное состояние state пробрасыват из fetch данные
      state.user = data.user;
      state.token = data.Access_token;
      state.refresh_token = data.Refresh_token;  //rtok - используется для получения token
    },

    // createNewBankAccount(state, newBankAccount) {
    //   state.bankAccounts.push([...state.bankAccounts, newBankAccount])
    //   console.log("Новый счёт добавлен");
    // },
    setWallets(state, data){
      state.wallets = data;
    },
    // setCategories(state, data) {
    //   state.categories = data
    // },
    setTransactions(state, data) {
      state.transactedCategories = data
    }
  },
  getters: {
    wallet : state => id => 
    (state.wallets.find(wallet => Number(wallet.Id) == Number(id))) 
    ? state.wallets.find(wallet => Number(wallet.Id) == Number(id)) : false,
    token : state => state.token
  },
  modules : [wallets, categories, user]
});

export default store;
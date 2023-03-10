import { createStore } from "vuex";

const store = createStore({

  state: {
    preloader: true,
    categories : false,
    user : false,
    token : false,
    refresh_token : false,
    wallets: false,
    allCurrencies: false,
    lastTransactions: false,
    

    // recipients: [
    //   {
    //     id: 1,
    //     name : 'Burger King',
    //     cashback: 'food'
    //   },
    //   {
    //     id: 2,
    //     name : 'H & M',
    //     cashback: 'clothes'
    //   },
    //   {
    //     id: 3,
    //     name : 'Decathlon',
    //     cashback: 'sport'
    //   },
    //   {
    //     id: 4,
    //     name : 'Pizza 24',
    //     cashback: 'food'
    //   },
    //   {
    //     id: 5,
    //     name : 'Zara',
    //     cashback: 'clothes'
    //   },
    //   {
    //     id: 6,
    //     name : 'Nike',
    //     cashback: 'sport'
    //   },
    // ],
    cashback: ['food', 'clothes', 'sport'],
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
    const res = await fetch('https://money.aprograms.ru?class=Wallet&action=change', {
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
  async income(context, data) {
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
      context.dispatch("transactIncome");
      context.dispatch("getWallets");
    }
    return res.ok;
  },
  async getCategories(context) {
    const res = await fetch('https://money.aprograms.ru?class=Category&action=get')
    if (res.ok) { // 200
      let result = await res.json(); //  result это уже объект от сервера
      context.commit("setCategories", result);
    }
    return res.ok;
  },
  
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
    },
    setCategories(state, data) {
      state.categories = data
    },
    transactIncome(state, data) {
      // на свой кошелёк закинуть новые данные - объект с категорией и сумму
      // для этого сначала найти свой кошелек по walletId и в него добавить
      // let searchedWallet = wallets.find(wallet=>wallet.Id === data.walletid).
      // const {sumAmount, category, categoryAmount } = searchedWallet  //положить эти данные в существующий кошелёк
      // или создать глобально вид кошелька те из чего он состоит,
      // например: 
      // const wallet = {
        // currency: USD,
        // totalWalletAmount: reduce (сумма всех категорий),
        // Ещё в него должен добавиться ключ cashback
        // categories: [
        // categ1: {
        // title: ЖКХ,
        // amount: 100,
        // },

        // categ2: {
        // title: FastFood,
        // amount: 50,
        // },
        // 
        // ],

        // 
        //}

        // При создании кошелька нужно выбрать категорию кэшбэка и класть её в объект кошелька, 
        // Как посмотреть как выглядит объект Кошелка на бэке ?
        // ...при транзакции "Расход" учитывать кэшбэк (5% от суммы операции)

    }
  },
  getters: {
    wallet : state => id => (state.wallets.find(wallet => Number(wallet.Id) == Number(id))) ? state.wallets.find(wallet => Number(wallet.Id) == Number(id)) : false,
    // allCurrencies: state => state.allCurrencies
}
});

export default store;
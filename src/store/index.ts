import { createStore } from 'vuex';
import { App } from 'vue'
interface MenuObj {
    parentId: number;
    id: number;
    children?:MenuObj[]
}

interface State {
    menus: MenuObj[]
}
interface NewMenus {
    [key: number]: MenuObj
}
const store = createStore<State>({
    state() {
        return {
            menus: []
        }
    },
    getters: {
        getNewMenus(state) {
            const newMenus: NewMenus = {};

            // 获取旧的菜单
            const menus = state.menus;
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].parentId === 0) {
                    // 一级菜单
                    newMenus[menus[i].id] = {...menus[i]}

                } else {
                    // 二级菜单
                    let parentId = menus[i].parentId;//一级菜单id
                    newMenus[parentId].children=newMenus[parentId].children||[];
                    newMenus[parentId].children?.push(menus[i])// ? 前面是空的话，后面不执行
                }
            }
            return newMenus
        }
    },
    mutations: {
        UPDATEMENUS(state, menus) {
            state.menus = menus
            console.log(state.menus)
        }
    },
    actions: {

    },
    modules: {

    }
});

export const initStore = (app: App<Element>) => {
    app.use(store);
}
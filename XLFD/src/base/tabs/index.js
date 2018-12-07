import TabsComponent from './tabs.vue';


// Tabs.Pane = Pane;
const Tabs = {};
Tabs.install = function(Vue){
    const TabsConstructor = Vue.extend(TabsComponent);
    Vue.component('Tabs',TabsConstructor)
}
export default Tabs;
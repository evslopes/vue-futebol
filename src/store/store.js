import Vue from 'vue'
import Vuex from 'vuex'
import timesModules from "@/store/modules/timesModules";
import jogadoresModules from "@/store/modules/jogadoresModules";
import partidasModules from "@/store/modules/partidasModules";
import golsModules from "@/store/modules/golsModules";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        timesModules,
        jogadoresModules,
        partidasModules,
        golsModules
    }
})

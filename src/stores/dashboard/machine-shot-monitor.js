import { defineStore } from 'pinia';

export const useMachineShotMonitorStore = defineStore('machine-shot-monitor', {
  state: () => ({
    filter : {
      id_machine: null,
      id_kanagata : null,
      part: null
    }
  }),
  getters: {

  },
  actions: {

  },
});

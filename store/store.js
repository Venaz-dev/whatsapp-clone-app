import { proxy } from "valtio";

const store = proxy({
  loading: false,
  user: null,
  activeConvo: "",
  sliderCounter: 0,
  slider: false,
  gallery: []
});

export default store;

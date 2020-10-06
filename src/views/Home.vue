<template>
  <div>
    <div id="herobg">
      <b-row class="block d-flex align-items-center">
        <b-col class="m-auto" style="color:white;">
          <h3>Lorem ipsum dolor</h3>
          <br>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.
          </span>
        </b-col>
        <b-col>
          <highlight-card :highlights="highlights"/>
        </b-col>
      </b-row>
    </div>
      <asset-card :assets="assets"/>
  </div>
</template>

<script>
  import HighlightCard from "../components/HighlightCard";
  import AssetCard from "../components/AssetCard";
  import {db} from "../firebase";

export default {
  components:{
    HighlightCard,
    AssetCard
  },
  data() {
    return {
      highlights: [
        { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#t', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/4b53f1a1-5f9b-4503-87ba-0592b9d1cd44.webp', rating: 4 },
        { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#2', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/ad87ded1-df4c-4cd5-a381-667f80677099.webp', rating: 3 },
        { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#3', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/1fa19fc9-2530-4998-9c1b-fa3cec3902a2.webp', rating: 2 },
        { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#4', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/1895cd4a-341e-4dd9-a6f9-80f4fa4d08db.webp', rating: 5 }
      ],
      assets: []
    }
  },
  computed: {
    highlightCollection() {
      return db.collection('pending').where('pending', '==', false).where('denied', '==', false)
    }
  },
  firestore(){
    return {
      assets: this.highlightCollection
    }
  }
}
</script>

<style>
  #creator{
    font-family: ROBLI;
    margin-bottom: 5px;
  }
  #asset_title{
    font-family: ROBLI;
  }
  #herobg{
    /*   background-image: url('../assets/images/bg3.png');
     background-size: cover;
      background-repeat: no-repeat;*/
    background: url('../assets/images/bg.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding:50px !important;
  }
  #herobg h1{
    font-family: MPB;
  }
  #herobg p{
    font-family: MPBO;
  }
</style>

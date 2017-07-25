<template>
  <header>
    <div class="tab text-center border-r">
      <router-link to="getAllApartment">
        <p>房源预定</p>
        <p>Reservation</p>
      </router-link>
    </div>
    <div class="tab text-center border-r">
     <router-link to="boutique">
       <p>精品房源</p>
       <p>Boutique</p>
     </router-link>
    </div>
    <div class="tab text-center">
      <router-link to="landlord">
       <p>房东加盟</p>
        <p>Landlord</p>
      </router-link>
    </div>
  </header>
</template>
<script>
  export default{
    name:'header'
  }
</script>

export default {
  name: 'productDetail',
  data() {
    return {
      productName: 'Slay the fire',
      productId: this.$route.params.id,
      tabPosition: 'top',
      activeTab: 'first',
      product: {
        name: 'Products1',
        currentPrice: '$3.2',
        price: '$5.40',
        contributor: 'CHEN XU ZHU ZHAO',
        tags: 'Python Java JavaScript',
        status: 'final version',
        saleVolume: '5000',
        releaseDate: '2020/11/20',
        recentUpdateDate: '2020/11/24',
        description: 'This is about AI',
        rating: 4.6,
      },
    }
  },

  methods: {

  }
}

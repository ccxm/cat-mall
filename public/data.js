/**
 * 数据库商品数据
 */
const goods = [
    {
        goodsId: '100001',
        goodsName: '英短蓝猫',
        originalPrice: 2500,
        discountPrice: 1500,
        memberPrice: 1499,
        masterImg: 'https://gd2.alicdn.com/imgextra/i3/2200828121620/O1CN018Anp4u1Nq0BYAaqyv_!!2200828121620.jpg_50x50.jpg_.webp',
        intro: '纯种英国短毛猫蓝猫猫咪活物幼猫宠物猫 上海可实地挑选',
        imgList: [
            'https://gd2.alicdn.com/imgextra/i3/2200828121620/O1CN018Anp4u1Nq0BYAaqyv_!!2200828121620.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200828121620/O1CN01sqP54e1Nq0BW6v1Y8_!!2200828121620.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2200828121620/O1CN01yxZFXi1Nq0BYAbBsY_!!2200828121620.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2200828121620/O1CN0189cqJN1Nq0BQMGA4i_!!2200828121620.jpg_50x50.jpg_.webp',
        ],
        address: '上海'
    },
    {
        goodsId: '100002',
        goodsName: '蓝猫',
        originalPrice: 1500,
        discountPrice: 300,
        memberPrice: 299,
        masterImg: 'https://gd3.alicdn.com/imgextra/i3/3630267353/O1CN01hJTdzB24BipU3nyN5_!!3630267353.jpg_50x50.jpg_.webp',
        intro: '英短活体蓝猫纯种短毛猫英国短毛蓝猫幼猫猫崽蓝胖子宠物家养猫咪',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i3/3630267353/O1CN01hJTdzB24BipU3nyN5_!!3630267353.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3630267353/O1CN01efFiWP24BipcahzmF_!!3630267353.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/3630267353/O1CN01w0N0oa24Bipd7x1ce_!!3630267353.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/3630267353/O1CN01N5EPLK24BipfVeuUu_!!3630267353.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/3630267353/O1CN0190grUR24BipfVcpcj_!!3630267353.jpg_50x50.jpg_.webp'
        ],
        address: '江苏苏州'
    },
    {
        goodsId: '100003',
        goodsName: '金渐层幼猫',
        originalPrice: 6800,
        discountPrice: 680,
        memberPrice: 599,
        masterImg: 'https://gd2.alicdn.com/imgextra/i3/2200735262068/O1CN01ckuOuX1R9Bdhdjx7A_!!2200735262068.png_50x50.jpg_.webp',
        intro: '纯种金渐层 英短金渐层 金渐层幼猫 金渐层幼猫 上海可上门挑选',
        imgList: [
            'https://gd2.alicdn.com/imgextra/i3/2200735262068/O1CN01ckuOuX1R9Bdhdjx7A_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2200735262068/O1CN010O46dM1R9BdiRZceM_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200735262068/O1CN01Azh1nh1R9Bdi9Xp3Z_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200735262068/O1CN01eUtmM81R9BdlJjnmF_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2200735262068/O1CN01bHTohu1R9Bdi9caRo_!!2200735262068.png_50x50.jpg_.webp'
        ],
        address: '上海'
    },
    {
        goodsId: '100004',
        goodsName: '海豹猫',
        originalPrice: 8800,
        discountPrice: 1099,
        memberPrice: 888,
        masterImg: 'https://gd3.alicdn.com/imgextra/i1/2200735262068/O1CN01Y6FJ8o1R9Bcnyingg_!!2200735262068.png_50x50.jpg_.webp',
        intro: '纯种蓝双色布偶猫幼猫 活体宠物 海豹双色布偶猫 上海可实体挑选',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i1/2200735262068/O1CN01Y6FJ8o1R9Bcnyingg_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2200735262068/O1CN01yLLWBY1R9BcpbHJjC_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2200735262068/O1CN0112Eqnx1R9BcqlVamM_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2200735262068/O1CN01awJxQD1R9BcrL1sFp_!!2200735262068.png_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200735262068/O1CN01RuntwE1R9Bctj3EEo_!!2200735262068.png_50x50.jpg_.webp'
        ],
        address: '上海'
    },
    {
        goodsId: '100005',
        goodsName: '布偶猫咪',
        originalPrice: 688,
        discountPrice: 288,
        memberPrice: 199,
        masterImg: 'https://gd2.alicdn.com/imgextra/i2/2200735262068/O1CN01Qr6YlD1R9BcAIn9zA_!!2200735262068.jpg_50x50.jpg_.webp',
        intro: '纯种布偶猫咪海豹双色蓝双山猫色宠物活体幼猫 上海可实地挑选',
        imgList: [
            'https://gd2.alicdn.com/imgextra/i2/2200735262068/O1CN01Qr6YlD1R9BcAIn9zA_!!2200735262068.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200735262068/O1CN01uchTAD1R9BcACeUug_!!2200735262068.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2200735262068/O1CN01iJHQRh1R9Bc2cKC5B_!!2200735262068.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2200735262068/O1CN01PdmR0w1R9BcDiZwAp_!!2200735262068.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2200735262068/O1CN01SvAkdd1R9BcCqHsbF_!!2200735262068.jpg_50x50.jpg_.webp'
        ],
        address: '上海'
    },
    {
        goodsId: '100006',
        goodsName: '小奶猫',
        originalPrice: 800,
        discountPrice: 399,
        memberPrice: 149,
        masterImg: 'https://gd1.alicdn.com/imgextra/i3/3968164891/O1CN01t6RFQd1m07kRE7I0C_!!3968164891.jpg_50x50.jpg_.webp',
        intro: '英短银渐层小奶猫宠物幼崽渐层猫咪活物纯种英国短毛小型可爱蓝猫',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i3/3968164891/O1CN01t6RFQd1m07kRE7I0C_!!3968164891.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3968164891/O1CN01UbXnPm1m07kQr1Il7_!!3968164891.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3968164891/O1CN01YFsYgm1m07kRE85ul_!!3968164891.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3968164891/O1CN01D5PzRS1m07kV3Ua5j_!!3968164891.jpg_50x50.jpg_.webp',
        ],
        address: '苏州'
    },
    {
        goodsId: '100007',
        goodsName: '幼猫',
        originalPrice: 1500,
        discountPrice: 809,
        memberPrice: 666,
        masterImg: 'https://gd1.alicdn.com/imgextra/i1/2200775366029/O1CN014CT6gN1uPKPsmcGNu_!!2200775366029.jpg_50x50.jpg_.webp',
        intro: '纯种英短银渐层猫幼猫活体折耳宠物猫咪 基地繁殖',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i1/2200775366029/O1CN014CT6gN1uPKPsmcGNu_!!2200775366029.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2200775366029/O1CN01I90NqK1uPKPwwBMCY_!!2200775366029.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2200775366029/O1CN01Gwnysh1uPKPwFDewo_!!2200775366029.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2200775366029/O1CN01rH54Wh1uPKPtiaiDV_!!2200775366029.jpg_50x50.jpg_.webp',
        ],
        address: '杭州'
    },
    {
        goodsId: '100008',
        goodsName: '小奶猫',
        originalPrice: 5000,
        discountPrice: 2999,
        memberPrice: 2599,
        masterImg: 'https://gd3.alicdn.com/imgextra/i4/3316892311/O1CN0169Mr9S1SwTtlhU49Y_!!3316892311.jpg_50x50.jpg_.webp',
        intro: '英短金渐层猫活体幼猫宠物猫咪活物幼崽纯种小奶猫',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i4/3316892311/O1CN0169Mr9S1SwTtlhU49Y_!!3316892311.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/3316892311/O1CN01ILNXKo1SwTtj7nGlv_!!3316892311.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/3316892311/O1CN01cEEhEu1SwTtiki9m6_!!3316892311.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/3316892311/O1CN01HJUBkF1SwTthS4Jte_!!3316892311.jpg_50x50.jpg_.webp',
        ],
        address: '上海'
    },
    {
        goodsId: '100009',
        goodsName: '布偶猫',
        originalPrice: 460,
        discountPrice: 99,
        memberPrice: 88,
        masterImg: 'https://gd3.alicdn.com/imgextra/i4/3382216290/O1CN01IsyuFJ1wKrojBEdhU_!!3382216290.jpg_50x50.jpg_.webp',
        intro: '纯种布偶猫活体幼猫宠物猫咪活物 上海杭州苏州武汉 可实地挑选',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i4/3382216290/O1CN01IsyuFJ1wKrojBEdhU_!!3382216290.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/3382216290/O1CN01fddKsT1wKrohJts8A_!!3382216290.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3382216290/O1CN01L858kp1wKrohWzOfp_!!3382216290.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3382216290/O1CN01XBaKsy1wKrojcdcOh_!!3382216290.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/3382216290/O1CN01wlV4Um1wKrokwXbRB_!!3382216290.jpg_50x50.jpg_.webp'
        ],
        address: '武汉'
    },
    {
        goodsId: '100010',
        goodsName: '黑猫',
        originalPrice: 800,
        discountPrice: 500,
        memberPrice: 400,
        masterImg: 'https://gd4.alicdn.com/imgextra/i1/2201241610038/O1CN01vNPAAD1C9RbQIR2iD_!!2201241610038.jpg_50x50.jpg_.webp',
        intro: '纯种孟买猫活体 宠物猫咪活体黑猫 可爱幼猫辟邪招财玄猫幼崽猫咪',
        imgList: [
            'https://gd4.alicdn.com/imgextra/i1/2201241610038/O1CN01vNPAAD1C9RbQIR2iD_!!2201241610038.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2201241610038/O1CN015Tq77w1C9RbSSbQmQ_!!2201241610038.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2201241610038/O1CN01zdvn2B1C9RbSSfFqK_!!2201241610038.jpg_50x50.jpg_.webp',
        ],
        address: '广州'
    },
    {
        goodsId: '100011',
        goodsName: '加菲猫',
        originalPrice: 12000,
        discountPrice: 100,
        memberPrice: 88,
        masterImg: 'https://gd3.alicdn.com/imgextra/i2/2207264875257/O1CN01j7mLYX1ohkhnEM8Mi_!!2207264875257.jpg_50x50.jpg_.webp',
        intro: '布偶猫幼猫纯种海双蓝双幼崽加菲暹罗金吉拉折耳猫矮脚小猫咪活物',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i2/2207264875257/O1CN01j7mLYX1ohkhnEM8Mi_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2207264875257/O1CN01Q3FiQz1ohkhw1ZGrF_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2207264875257/O1CN01TADEPU1ohkhszIJl5_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2207264875257/O1CN01KKWepM1ohkhwEsLaJ_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2207264875257/O1CN01lr3gJS1ohkhuS6Drh_!!2207264875257.jpg_50x50.jpg_.webp'
        ],
        address: '浙江'
    },
    {
        goodsId: '100012',
        goodsName: '米粒猫',
        originalPrice: 7660,
        discountPrice: 3888,
        memberPrice: 3588,
        masterImg: 'https://gd1.alicdn.com/imgextra/i2/2201499782317/O1CN01IDRfHj1SzEE9XNujF_!!2201499782317.jpg_50x50.jpg_.webp',
        intro: '布偶猫幼猫布偶猫活体布偶猫纯种CFA认证海双蓝双布偶双血统认证',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i2/2201499782317/O1CN01IDRfHj1SzEE9XNujF_!!2201499782317.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2201499782317/O1CN01BhPHK51SzEE5jmutu_!!2201499782317.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2201499782317/O1CN01fY80Io1SzEE9XPnF4_!!2201499782317.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2201499782317/O1CN01EGqnTs1SzEE6ciiOb_!!2201499782317.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2201499782317/O1CN01I3kqSP1SzEDxMIXTn_!!2201499782317.jpg_50x50.jpg_.webp'
        ],
        address: '广州'
    },
    {
        goodsId: '100013',
        goodsName: '暹罗猫',
        originalPrice: 3000,
        discountPrice: 2000,
        memberPrice: 1999,
        masterImg: 'https://gd1.alicdn.com/imgextra/i2/2201203844242/O1CN01xkIEgb1hCshCOdb6j_!!2201203844242.jpg_50x50.jpg_.webp',
        intro: '纯种泰国暹罗猫活体幼猫挖煤猫家养幼猫蓝眼睛重点色暹罗宠物猫咪',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i2/2201203844242/O1CN01xkIEgb1hCshCOdb6j_!!2201203844242.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/2201203844242/O1CN01kr7BEX1hCshEEsZ6A_!!2201203844242.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2201203844242/O1CN019NGZ3k1hCshEEshQO_!!2201203844242.png_50x50.jpg_.webp',
        ],
        address: '四川成都'
    },
    {
        goodsId: '100014',
        goodsName: '包子猫',
        originalPrice: 1500,
        discountPrice: 500,
        memberPrice: 388,
        masterImg: 'https://gd1.alicdn.com/imgextra/i4/2201438747449/O1CN01OurXfM24tgsglcyQr_!!2201438747449.jpg_50x50.jpg_.webp',
        intro: '英短蓝猫幼猫活体宠物猫正宗包子脸幼崽英短矮脚蓝猫猫咪活体宠物',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i4/2201438747449/O1CN01OurXfM24tgsglcyQr_!!2201438747449.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2201438747449/O1CN01QVg66824tgsfqtzkq_!!2201438747449.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2201438747449/O1CN01QnfBeC24tgshacfpG_!!2201438747449.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/2201438747449/O1CN012TlCMx24tgsfqsaT7_!!2201438747449.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2201438747449/O1CN01m79Yys24tgsXbRBHr_!!2201438747449.jpg_50x50.jpg_.webp'
        ],
        address: '西藏拉萨'
    },
    {
        goodsId: '100015',
        goodsName: '仙女猫',
        originalPrice: 9800,
        discountPrice: 1800,
        memberPrice: 1699,
        masterImg: 'https://gd4.alicdn.com/imgextra/i2/1974944047/O1CN01kWWKrL1flZT6NQiUP_!!1974944047.jpg_50x50.jpg_.webp',
        intro: '布偶猫幼猫宠物猫幼崽活体活物拿破仑猫咪小奶猫波斯纯种猫咪仙女',
        imgList: [
            'https://gd4.alicdn.com/imgextra/i2/1974944047/O1CN01kWWKrL1flZT6NQiUP_!!1974944047.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/1974944047/O1CN01exUmWT1flZT1fw8js_!!1974944047.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/1974944047/O1CN01p7LvVl1flZT9YVmyf_!!1974944047.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/1974944047/O1CN01LdCb4B1flZTAt16yR_!!1974944047.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/1974944047/O1CN01d4CPHb1flZT9YV7P9_!!1974944047.jpg_50x50.jpg_.webp'
        ],
        address: '北京'
    },
    {
        goodsId: '100016',
        goodsName: '波斯猫',
        originalPrice: 9800,
        discountPrice: 6800,
        memberPrice: 5799,
        masterImg: 'https://gd1.alicdn.com/imgextra/i2/0/TB1o.g9a_1z01JjSZFCXXXY.XXa_!!0-item_pic.jpg_50x50.jpg_.webp',
        intro: '梵娅宠物猫咪活体 纯白色异国短毛猫加菲猫 高地波斯猫布偶猫幼猫',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i2/0/TB1o.g9a_1z01JjSZFCXXXY.XXa_!!0-item_pic.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3387833466/TB2rz8ifvNNTKJjSspfXXbXIFXa_!!3387833466.jpg_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3387833466/TB2z0chlwn.PuJjSZFkXXc_lpXa_!!3387833466.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/3387833466/TB2FaHWool7MKJjSZFDXXaOEpXa_!!3387833466.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/3387833466/TB22sxBklUSMeJjy1zjXXc0dXXa_!!3387833466.jpg_50x50.jpg_.webp'
        ],
        address: '北京'
    },
    {
        goodsId: '100017',
        goodsName: '小胖猫',
        originalPrice: 2000,
        discountPrice: 199,
        memberPrice: 168,
        masterImg: 'https://gd3.alicdn.com/imgextra/i2/1868725912/O1CN01JWp9d81tXk7UdOsZE_!!1868725912.png_50x50.jpg_.webp',
        intro: '纯种加菲猫宠物猫异国短毛猫幼崽猫咪活体纯白红小胖净梵加菲猫咪',
        imgList: [
            'https://gd3.alicdn.com/imgextra/i2/1868725912/O1CN01JWp9d81tXk7UdOsZE_!!1868725912.png_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/1868725912/O1CN01qcNkNG1tXk7S82kpx_!!1868725912.png_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/1868725912/O1CN01biPHKu1tXk7SHoNMC_!!1868725912.jpg_50x50.jpg_.webp',
            'https://gd2.alicdn.com/imgextra/i2/1868725912/O1CN01bi4jzO1tXk7UbMCIL_!!1868725912.png_50x50.jpg_.webp',
        ],
        address: '广东深圳'
    },
    {
        goodsId: '100018',
        goodsName: '折耳猫',
        originalPrice: 3888,
        discountPrice: 1200,
        memberPrice: 1108,
        masterImg: 'https://gd1.alicdn.com/imgextra/i2/2207264875257/O1CN01TADEPU1ohkhszIJl5_!!2207264875257.jpg_50x50.jpg_.webp',
        intro: '蓝白幼猫纯种英短蓝猫银渐层折耳猫幼崽曼基康矮脚宠物小猫咪活物',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i2/2207264875257/O1CN01TADEPU1ohkhszIJl5_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2207264875257/O1CN01DaWGPm1ohkhrfvhWx_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2207264875257/O1CN01KKWepM1ohkhwEsLaJ_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2207264875257/O1CN01qWZItZ1ohkhwEsgQi_!!2207264875257.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2207264875257/O1CN01moQGTq1ohkhtjBY3t_!!2207264875257.jpg_50x50.jpg_.webp'
        ],
        address: '上海'
    },
    {
        goodsId: '100019',
        goodsName: '纯种蓝猫活体蓝猫幼猫英短蓝猫 蓝猫英短英国短毛猫 蓝猫宠物猫咪',
        originalPrice: 800,
        discountPrice: 403,
        memberPrice: 203,
        masterImg: 'https://gd4.alicdn.com/imgextra/i4/2206709760453/O1CN01QR4SxS1FDVzv9CxEb_!!2206709760453.jpg_50x50.jpg_.webp',
        intro: '',
        imgList: [
            'https://gd4.alicdn.com/imgextra/i4/2206709760453/O1CN01QR4SxS1FDVzv9CxEb_!!2206709760453.jpg_50x50.jpg_.webp',
            'https://gd1.alicdn.com/imgextra/i1/2206709760453/O1CN0183wzWY1FDVzr7uqX0_!!2206709760453.jpg_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/2206709760453/O1CN01VmnGzR1FDVzvI5GH9_!!2206709760453.jpg_50x50.jpg_.webp',
        ],
        address: '四川成都'
    },
    {
        goodsId: '100020',
        goodsName: '蓝眼猫',
        originalPrice: 2300,
        discountPrice: 1799,
        memberPrice: 1599,
        masterImg: 'https://gd1.alicdn.com/imgextra/i1/3435629636/O1CN01uyLDbu2L3L1k30L1b_!!3435629636.png_50x50.jpg_.webp',
        intro: '天津实体猫舍英短蓝猫宠物猫 CFA专业认证纯种双血统包健康可上门',
        imgList: [
            'https://gd1.alicdn.com/imgextra/i1/3435629636/O1CN01uyLDbu2L3L1k30L1b_!!3435629636.png_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/3435629636/O1CN01Pgthek2L3L1k6oBMo_!!3435629636.png_50x50.jpg_.webp',
            'https://gd4.alicdn.com/imgextra/i4/3435629636/O1CN01ERtZgQ2L3L1k6o7C9_!!3435629636.png_50x50.jpg_.webp',
            'https://gd3.alicdn.com/imgextra/i3/3435629636/O1CN01FmnNmF2L3L1kufKDz_!!3435629636.png_50x50.jpg_.webp',
        ],
        address: '天津'
    },
]

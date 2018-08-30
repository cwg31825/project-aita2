<template>
  <div>
    <div class="mask" @click="_hideLinkage"></div>
    <div class="clearfix linkage">
      <div class="province pickerWrapper">
        <mt-picker :slots="provinces" @change="onProvinceChange" value-key="region_name"></mt-picker>
      </div>
      <div class="city pickerWrapper">
        <mt-picker :slots="citys" @change="onCityChange" value-key="region_name"></mt-picker>
      </div>
      <div class="area pickerWrapper">
        <mt-picker :slots="areas" @change="onAreaChange" value-key="region_name"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import CITY_DATA from "../assets/data/address3data.json"; //引入cityData数据

export default {
  props: ["formData"],
  computed: {
    result() {
      return {
        region_name: this.province.region_name + "," + this.city.region_name + "," + this.area.region_name,
        id: {province:this.province.id,city:this.city.id,district:this.area.id}
      };
    }
  },
  data() {
    return {
      province: {
        region_name: "北京",
        id: "2"
      },
      maskFlag: false,
      city: {
        region_name: "北京",
        id: "52"
      },
      area: {
        region_name: "东城区",
        id: "500"
      },
      flag: 0, //最开始省市区那三个picker会初始化调用change事件，但是此时没有省市区数据，因此会报错，
      //所以以这个标识符来控制当时第一次初始化时调用change事件时直接return
      provinces: [
        {
          flex: 1,
          values: this._getProvince("北京"),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "right"
        }
      ],
      citys: [
        {
          flex: 1,
          values: this._getCity("北京"),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        }
      ],
      areas: [
        {
          flex: 1,
          values: this._getArea("北京", "北京"),
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    _hideLinkage() {
      this.$emit("getLinkage", this.result); //触发父组件的getLinkage事件接收结果数据
    },
    onProvinceChange(picker, values) {
      if (this.flag === 0) {
        return;
      }
      let provinceIndex = picker.getSlotValue(0);
      this.province = provinceIndex;
      let city = this._getCity(provinceIndex.region_name);
      this.citys[0].values = city;
      this.city = city[0];
    },
    onCityChange(picker, values) {
      if (this.flag === 0) {
        return;
      }
      let cityIndex = picker.getSlotValue(0);
      this.city = cityIndex;
      let provinceIndex = this.province;
      let area = this._getArea(provinceIndex.region_name, cityIndex.region_name);
      this.areas[0].values = area;
      this.area = area[0];
    },
    onAreaChange(picker, values) {
      if (this.flag === 0) {
        this.flag = 1;
        return;
      }
      let areaIndex = picker.getSlotValue(0);
      this.area = areaIndex;
    },
    //得到省份数据
    _getProvince() {
      let province = [];
      CITY_DATA.forEach(function(item, index) {
        let obj = {};
        obj.id = item.id;
        obj.region_name = item.region_name;
        province.push(obj);
      });
      return province;
    },
    //根据省份得到城市数据
    _getCity(province) {
      let city = [];
      CITY_DATA.forEach((item, index) => {
        if (item.region_name === province) {
          item.children.forEach((item, index) => {
            let obj = {};
            obj.id = item.id;
            obj.region_name = item.region_name;
            city.push(obj);
            return;
          });
        }
      });
      return city;
    },
    //根据城市和省份得到区域数据
    _getArea(province, city) {
      let area = [];
      CITY_DATA.forEach((item, index) => {
        if (item.region_name === province) {
          item.children.forEach((item, index) => {
            if (item.region_name === city) {
              item.children.forEach(item => {
                let obj = {};
                obj.id = item.id;
                obj.region_name = item.region_name;
                area.push(obj);
                return;
              });
            }
          });
        }
      });
      if (area.length == 0) {
        //如果没有区域数据则第三个picker显示的内容
        area.push({
          region_name: "没有",
          id: "000000"
        });
      }
      return area;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.linkage {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  left: 0;
  overflow: hidden;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.pickerWrapper {
  width: 33.3%;
  float: left;
}
</style>
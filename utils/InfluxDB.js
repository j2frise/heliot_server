const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = '8BBJSHQ6PJ-BaTUzq-1nwrMVkP88HTwISiH51oOfJ2uz6jB9C4cl6Q8H6TTUPEM2hbz4oib7nGRXi1QAGbnzfg=='
const org = 'jarce.boukoro@hetic.net'
const bucket = 'heticgroupe3'

module.exports = {
  config: function(){
    const client = new InfluxDB({url: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token: token})
    return client
  }
}

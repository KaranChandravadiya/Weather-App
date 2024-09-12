import { Button, Card, Input, Table } from '@mui/joy'
import { Box, TableCell, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

function Weather() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'london',
    humidity: 10,
    speed: 2,
    image: 'images/clouds.png'
  })


  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Search Button function -created by karan -12/09/2024
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f2b8ee72225cf92c235f8bfd67656e98&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagePath = '';       //image dynamic changes
          if (res.data.weather[0].main == "Clouds") {
            imagePath = "images/clouds.png"             
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = "images/clear.png"
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "images/rain.png"
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = "images/drizzle.png"
          } else if (res.data.weather[0].main == "Mist") {
            imagePath = "images/mist.png"
          } else {
            imagePath = "images/clouds.png"
          }
          console.log(res.data);
          setData({                                           //dynamic search city weathers functionalty
            ...data, celcius: res.data.main.temp, name: res.data.name,
            humidity: res.data.main.humidity, speed: res.data.wind.speed,
            image: imagePath
          })
          setError('');
        })
        .catch(error => {
          if (error.response.status == 404) {    //error message functionalty
            setError("Invalid City Name")
          } else {
            setError('');
          }
          console.log(error)
        });
    }
  }


  return (
    <>
      <Box style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <Card style={{ maxWidth: 500, backgroundColor: '#81d4fa', placeItems: 'center' }} >
          <Table>
            <TableRow>
              {/* Error meassage show */}
              <h3 style={{ color: 'red', alignItems: 'left' , margin: 5 }}>{error}</h3>
            </TableRow>
            <TableRow style={{ display: 'flex', alignItems: 'center' }}>
              {/* search input field */}
              <Input
                placeholder="Enter City Name"
                type='text'
                // value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ minWidth: '418px', display: 'flex' , borderRadius: '16px' }}
              />
              {/* search button */}
              <Button type="submit" onClick={handleClick} style={{ backgroundColor: '#78909c', margin: '10px' }}>Search</Button>
            </TableRow>
            <TableRow>
              {/* weather wise dynamic images */}
              <img src={data.image} height={"150px"} />
              {/* dynamic celcius show -math.round atle round figure kare dot pachi na numbers na batave */}
              <h1>{Math.round(data.celcius)}°c</h1>  
              {/* search name dynamic show*/}
              <h2>{data.name}</h2>
            </TableRow>
          </Table>
          <TableRow>
            <TableCell>
              <TableRow>
                <TableCell>
              {/* humidity static image */}
                  <img src='images/humidity.png' height={"50px"} width={"50px"} />
                </TableCell>
                <TableCell>
              {/* dynamic humidity show*/}
                  <h1 style={{ margin: 0 }}>{Math.round(data.humidity)}</h1>
                  <h2 style={{ margin: 0 }}>Humidity</h2>
                </TableCell>
              </TableRow>
            </TableCell>
            <TableCell>
              <TableRow>
                <TableCell>
              {/* wind static image */}
                  <img src='images/wind.png' height={"50px"} width={"50px"} />
                </TableCell>
                <TableCell>
              {/* dynamic speed show */}
                  <h1 style={{ margin: 0 }}>{Math.round(data.speed)} km/h</h1>
                  <h2 style={{ margin: 0 }}>Wind</h2>
                </TableCell>
              </TableRow>
            </TableCell>
          </TableRow>
        </Card>
      </Box>
    </>
  )
}

export default Weather

// https://api.openweathermap.org/data/2.5/weather?id={cityid}&appid={API key}
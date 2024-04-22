import { Alert } from "react-native";

export const handleUserLogin = async ({ userName, userPass, deviceId = "", platformName = "" }: any) => {
  try {
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('password', userPass);

    console.log("username", userName)
    console.log("password", userPass)
    const response = await fetch('http://dev.elifsoft.io/api/AccountApi/Login', {
      method: 'POST',
      body: formData,
      headers: {
        // İsteğe bağlı olarak başlıklar ekleyebilirsiniz
        'Content-Type': 'multipart/form-data',
      },
    })

    const result = await response.json()
    // console.log("result", result)
    return response.json()
  }
  catch (e: any) {
    console.log(e)
    Alert.alert("HAta")
  }
};
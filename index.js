const admin = require("firebase-admin");
const serviceAccount = require("./foodhub-8e02b-firebase-adminsdk-0mm8k-21d74be6fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (fcmToken) => {
  const message = {
    token:
      "c3YY-HPA4m3GBsKJ5x7hDG:APA91bHokkmGQZxxER9tDd_E5YPTGaEn2sdw4dAuLxmAtaT0iMyq6143zfITLzzB8SbG4Cjbhn1aig9t_34blDdmOnpMlWUkEjXVAXH6efSjmCl-9mjCMFA", // Device FCM Token
    notification: {
      title: "New Message 🚀",
      body: "This is a test notification from Firebase!",
    },
    data: {
      screen: "OrderDetails", // Custom data for navigation
      orderId: "12345",
      click_action: "https://sit-foodhub-uk.stage.t2sonline.com/orderHistory",
    },
    webpush: {
      fcm_options: {
        link: "https://sit-foodhub-uk.stage.t2sonline.com/orderHistory",
      },
    },
    // android: {
    //   priority: "high",
    // },
    // apns: {
    //   payload: {
    //     aps: {
    //       contentAvailable: true,
    //       sound: "default",
    //     },
    //   },
    // },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

// Call function with FCM token of the target device
sendNotification("your_device_fcm_token_here");

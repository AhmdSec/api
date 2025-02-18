URL: https://developers.tap.company/docs/benefitpay-sdk-android

ndroid

Integrating Android BenefitPay SDK in your application

Introduction

Before diving into the development process, it's essential to establish the prerequisites and criteria necessary for a successful build. In this step, we'll outline the specific Android requirements, including the minimum SDK version and other important details you need to consider. Let's ensure your project is set up for success from the very beginning.

Sample Demo
Step 1: Requirements
We support Android from minSdk 24
Kotlin supports version 1.8.0+
Step 2: Get Your Public Keys

While you can certainly use the sandbox keys available within our sample app which you can get by following the installation page, however, we highly recommend visiting our onboarding page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating BenefitPay-android integration.

Step 3 : Installation
Gradle
in project module Gradle
Kotlin
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}


Then get the latest dependency in your app module Gradle

Kotlin
dependencies {
  implementation : 'com.github.Tap-Payments:BenefitPay-Android:0.0.20'
}

Step 4: Integrating BenefitPay-Android

This integration offers two distinct options: a simple integration designed for rapid development and streamlined merchant requirements, and an advanced integration that adds extra features for a more dynamic payment integration experience.

Integration Flow

Note that in Android, you have the ability to create the UI part of the BenefitPay-Android by creating it as a normal view in your XML then implement the functionality through code or fully create it by code. Below we will describe both flows:




You will have to create a variable of type BenefitPayButton, which can be done in one of two ways:

Created in the XML and then linked to a variable in code.
Created totally within the code. Once you create the variable in any way, you will have to follow these steps:
Create the parameters.
Pass the parameters to the variable.
Implement TapBenefitPayStatusDelegate interface, which allows you to get notified by different events fired from within the BenefitPay-Android SDK, also called callback functions.
Initialising the UI

Using XML

Create a view in XML
Kotlin
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="match_parent"
    tools:context=".main_activity.MainActivity">

 <company.tap.tapbenefitpay.open.web_wrapper.TapBenefitPay
        android:id="@+id/tapBenefitPay"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />

</LinearLayout>
 


Accessing the BenefitPayButton created in XML in your code

Create a TapBenefitPay instance from the created view above to your Activity :

Kotlin
   lateinit var tapBenefitPay: TapBenefitPay
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
taBenefitPay = findViewById<TapBenefitPay>(R.id.tapBenefitPay)
    }



Using Code to create the BenefitPayButton

Kotlin
     lateinit var tapBenefitPay: TapBenefitPay
        override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

         val linearLayoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
        )
        /** create dynamic view of TapBenefitPay view **/ 
        tapBenefitPay  = TapBenefitPay(this)
        tapBenefitPay.layoutParams = linearLayoutParams
        /** refrence to parent layout view **/  
        this.findViewById<LinearLayout>(R.id.linear_layout).addView(tapBenefitPay)
}

Step 5: Choose your Integration
Simple Integration

Here, you'll discover a comprehensive table featuring the parameters applicable to the simple integration. Additionally, you'll explore the various methods for integrating the SDK, either using xml to create the layout and then implementing the interface functionalities by code, or directly using code. Furthermore, you'll gain insights into how to receive callback notifications.

Parameters

Each parameter is linked to the reference section, which provides a more in-depth explanation of it.

Parameter	Description	Required	Type	Sample
operator	It has the key obtained after registering your package name, also known as the Public key. Also, the hashString value is used to validate live charges.	True	String	var operator=HashMap\<String,Any>(),operator.put("publicKey","pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7"),operator.put("hashString","")
Order	Order details linked to the charfe.	True	Dictionary	var order = HashMap<String, Any>(), order.put("id","") order.put("amount",1),order.put("currency","BHD"),order.put("description",""), order.put("reference":"A reference to this order in your system"))
customer	Customer details for charge process.	True	Dictionary	var customer = HashMap<String,Any> ,customer.put("id,""), customer.put("nameOnCard","Tap Payments"),customer.put("editable",true),) var name :HashMap<String,Any> = [["lang":"en","first":"TAP","middle":"","last":"PAYMENTS"]] "contact":["email":"tap@tap.company ", "phone":["countryCode":"+965","number":"88888888"]]] customer.put("name",name) , customer.put("contact",contact)
Configuring the BenefitPay-Android SDK

After creating the UI using any of the previously mentioned ways, it is time to pass the parameters needed for the SDK to work as expected and serve your needs correctly.

Creating the parameters

To allow flexibility and to ease the integration, your application will only has to pass the parameters as a HashMap<String,Any> . First, let us create the required parameters:

Kotlin
     /**
       * operator
       */
      val operator = HashMap<String,Any>()
        operator.put("publicKey","pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7")
        operator.put("hashString","")

        /**
         * phone
         */
        val phone = HashMap<String,Any>()
        phone.put("countryCode","+20")
        phone.put("number","011")

        /**
         * contact
         */
        val contact = HashMap<String,Any>()
        contact.put("email","test@gmail.com")
        contact.put("phone",phone)
        /**
         * name
         */
        val name = HashMap<String,Any>()
        name.put("lang","en")
        name.put("first","Tap")
        name.put("middle","")
        name.put("last","Payment")

        /**
         * customer
         */
        val customer = HashMap<String,Any>()
        customer.put("id", "")
customer.put("contact", contact)
customer.put("names", listOf(name)) 

        /**
         * order
         */
        val order = HashMap<String,Any>()
        order.put("id","order_id")
        order.put("amount","1")
        order.put("currency","BHD")
        order.put("description","description")
        order.put("reference","refrence_id")

        /**
         * configuration request
         */

        val configuration = LinkedHashMap<String,Any>()


        configuration.put("paymentMethod",paymentMethod ?: "benefitpay")
        configuration.put("merchant",merchant)
        configuration.put("scope",scopeKey.toString())
        configuration.put("redirect","tapredirectionwebsdk://") // TODO what will be in this
        configuration.put("customer",customer)
        configuration.put("interface",interfacee)
        configuration.put("reference",reference)
         configuration.put("metadata","")
         configuration.put("post",post)
        configuration.put("transaction",transaction)
        configuration.put("operator",operator)



Pass these parameters to the created Button variable before as follows
Kotlin
      BeneiftPayConfiguration.configureWithTapBenfitPayDictionaryConfiguration(
            this, 
            findViewById(R.id.benfit_pay),
            configuration,
            TapCardStatusDelegate)


Full code snippet for creating the parameters + passing it BenefitPayButton variable

Kotlin

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
      /**
       * operator
       */
      val operator = HashMap<String,Any>()
        operator.put("publicKey","pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7")
        operator.put("hashString","")

        /**
         * phone
         */
        val phone = HashMap<String,Any>()
        phone.put("countryCode","+20")
        phone.put("number","011")

        /**
         * contact
         */
        val contact = HashMap<String,Any>()
        contact.put("email","test@gmail.com")
        contact.put("phone",phone)
        /**
         * name
         */
        val name = HashMap<String,Any>()
        name.put("lang","en")
        name.put("first","Tap")
        name.put("middle","")
        name.put("last","Payment")

        /**
         * customer
         */
        val customer = HashMap<String,Any>()
        customer.put("id", "")
customer.put("contact", contact)
customer.put("names", listOf(name)) 

        /**
         * order
         */
        val order = HashMap<String,Any>()
        order.put("id","order_id")
        order.put("amount","1")
        order.put("currency","BHD")
        order.put("description","description")
        order.put("reference","refrence_id")

        /**
         * configuration request
         */

        val configuration = LinkedHashMap<String,Any>()
        configuration.put("operator", operator)
        configuration.put("order",order)
        configuration.put("customer",customer)

     BeneiftPayConfiguration.configureWithTapBenfitPayDictionaryConfiguration(
            this, 
            findViewById(R.id.benfit_pay),
            configuration,
            object : TapBenefitPayStatusDelegate {
                override fun onSuccess(data: String) {
                    Log.i("data",data.toString())
                }
                override fun onReady() {
                    Log.i("data","onReady")

                }


                override fun onError(error: String) {
                    Log.i("data","onError")


                }
                
            })
}

Receiving Callback Notifications

Now we have created the UI and the parameters required to to correctly display BenefitPayButton form. For the best experience, your class will have to implement TapBenefitPayStatusDelegate interface, which is a set of optional callbacks, that will be fired based on different events from within the benefit button. This will help you in deciding the logic you need to do upon receiving each event. Kindly follow the below steps in order to complete the mentioned flow:

Go back to the Activity file you want to get the callbacks into.
Head to the class declaration line
Add TapBenefitPayStatusDelegate
Override the required callbacks as follows:
Kotlin
 object : TapBenefitPayStatusDelegate {
                override fun onBenefitPaySuccess(data: String) {
                    Log.i("data",data.toString())
                }
                override fun onBenefitPayReady() {
                    Log.i("data","onReady")

                }


                override fun onBenefitPayError(error: String) {
                    Log.i("data","onError")


                }
                
            }

Advanced Integration

The advanced configuration for the BenefitPay-Android integration not only has all the features available in the simple integration but also introduces new capabilities, providing merchants with maximum flexibility. You can find a code below, where you'll discover comprehensive guidance on implementing the advanced flow as well as a complete description of each parameter.

Parameters

Each parameter is linked to the reference section, which provides a more in depth explanation of it.

Parameter	Description	Required	Type	Sample
operator	It has the key obtained after registering your package name, also known as Public key. Also, the hashString value which is used to validate live charges.	True	String	var operator=HashMap<String,Any>(),operator.put("publicKey","pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7"),operator.put("hashString","")
Order	Order details linked to the charfe.	True	Dictionary	var order = HashMap<String, Any>(), order.put("id","") order.put("amount",1),order.put("currency","BHD"),order.put("description",""), order.put("reference":"A reference to this order in your system"))
invoice	Order details linked to the charge.	False	Dictionary	var invoice = HashMap<String,Any>.put("id","")
merchant	Merchant id obtained after registering your package name .	True	Dictionary	` var merchant = HashMap<String,Any>.put("id","")
customer	Customer details for charge process.	True	Dictionary	var customer = HashMap<String,Any> ,customer.put("id,""), customer.put("nameOnCard","Tap Payments"),customer.put("editable",true),) var name :HashMap<String,Any> = [["lang":"en","first":"TAP","middle":"","last":"PAYMENTS"]] "contact":["email":"tap@tap.company ", "phone":["countryCode":"+965","number":"88888888"]]] customer.put("name",name) , customer.put("contact",contact)
interface	Look and feel related configurations (optional).	False	Dictionary	var interface = HashMap<String,Any> ,interface.put("locale","en"), interface.put("theme","light"), interface.put("edges","curved"),interface.put("colorStyle","colored"),interface.put("loader",true) // Allowed values for theme : light/dark. locale: en/ar, edges: curved/flat, direction:ltr/dynaimc,colorStyle:colored/monochrome
post	Webhook for server-to-server updates (optional).	False	Dictionary	` var post = HashMap<String,Any>.put("url","")
Initialisation of the input

You can use a Hashmap to send data to our SDK. The benefit is that you can generate this data from one of your APIs. If we make updates to the configurations, you can update your API, avoiding the need to update your app on the Google Play Store.

Kotlin
     /**
       * operator
       */
      val operator = HashMap<String,Any>()
        operator.put("publicKey","pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7")
        operator.put("hashString","")

        /**
         * phone
         */
        val phone = HashMap<String,Any>()
        phone.put("countryCode","+20")
        phone.put("number","011")

        /**
         * contact
         */
        val contact = HashMap<String,Any>()
        contact.put("email","test@gmail.com")
        contact.put("phone",phone)
        /**
         * name
         */
        val name = HashMap<String,Any>()
        name.put("lang","en")
        name.put("first","Tap")
        name.put("middle","")
        name.put("last","Payment")

        /**
         * customer
         */
        val customer = HashMap<String,Any>()
        customer.put("id", "")
customer.put("contact", contact)
customer.put("names", listOf(name)) 

       
        /**
         * merchant
         */
        val merchant = HashMap<String,Any>()
        merchant.put("id", "")

        /**
         * invoice
         */
        val invoice = HashMap<String,Any>()
        invoice.put("id","")

     /** interface **/

      val interfacee = HashMap<String,Any>()
        interfacee.put("locale",selectedLanguage ?: "en")
        interfacee.put("theme",selectedTheme ?: "light")
        interfacee.put("edges",selectedCardEdge ?: "curved")
        interfacee.put("colorStyle",selectedColorStylee ?:"colored")
        interfacee.put("loader",loader)

     /** post  **/

        val post = HashMap<String,Any>()
        post.put("url","")
        /**
         * configuration request
         */
/**
 * Transaction
 * ***/
val transaction = HashMap<String,Any>()
transaction.put("amount",  if (orderAmount?.isEmpty() == true)"1" else orderAmount.toString() )
transaction.put("currency",selectedCurrency)

/**
 * invoice
 */
val invoice = HashMap<String,Any>()
invoice.put("id","")

val post = HashMap<String,Any>()
post.put("url","")

val configuration = LinkedHashMap<String,Any>()
        configuration.put("operator", operator)
        configuration.put("order",order)
        configuration.put("customer",customer)
        configuration.put("merchant",merchant)
        configuration.put("invoice",invoice)
        configuration.put("interface",interfacee)
        configuration.put("post",post)


Receiving Callback Notifications (Advanced Version)

The below will allow the integrators to get notified from events fired from the BenefitPayButton.

Kotlin
    override fun onBenefitPayReady() {
           print("\n\n========\n\nonReady")
    }

    override fun onBenefitPayClick() {
         print("\n\n========\n\noClick")
    }

    override fun onBenefitPayChargeCreated(data: String) {
           print("\n\n========\n\nonChargeCreated")
    }

    override fun onBenefitPayOrderCreated(data: String) {
           print("\n\n========\n\nonOrderCreated")

    }

    override fun onBenefitPayCancel() {
           print("\n\n========\n\nonCancel")
    }

    override fun onBenefitPayError(error: String) {
           print("\n\n========\n\nonError")
    }
    override fun onBenefitPaySuccess(data: String) {
    print("onBenefitPaySuccess >>")
    }


Full Code Sample

Once all of the above steps are successfully completed, your Activity file should look like this:

Kotlin

class MainActivity : AppCompatActivity() ,TapBenefitPayStatusDelegate{
    lateinit var tapBenefitPay: TapBenefitPay
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        configureSdk()
    }

    fun configureSdk(){


        /**
         * operator
         */
        val operator = HashMap<String,Any>()
        operator.put("publicKey",publicKey.toString())
        operator.put("hashString",hashStringKey.toString())

       

        /**
         * merchant
         */
        val merchant = HashMap<String,Any>()
        merchant.put("id", "")

       


        /**
         * phone
         */
        val phone = java.util.HashMap<String,Any>()
        phone.put("countryCode","+20")
        phone.put("number","011")


        /**
         * contact
         */
        val contact = java.util.HashMap<String,Any>()
        contact.put("email","test@gmail.com")
        contact.put("phone",phone)
        /**
         * name
         */
        val name = java.util.HashMap<String,Any>()
        name.put("lang","en")
        name.put("first", "first")
        name.put("middle", "middle")
        name.put("last","last")

        /**
         * customer
         */
        val customer = java.util.HashMap<String,Any>()
        customer.put("id", "")
        customer.put("contact",contact)
        customer.put("name", listOf(name))

        /**
         * interface
         */
    
        val interfacee = HashMap<String,Any>()
        interfacee.put("locale",selectedLanguage ?: "en")
        interfacee.put("edges",selectedCardEdge ?: "curved")
        


        val post = HashMap<String,Any>()
        post.put("url","")
        val configuration = LinkedHashMap<String,Any>()

        configuration.put("paymentMethod",paymentMethod ?: "benefitpay")
        configuration.put("merchant",merchant)
        configuration.put("scope","charge")
        configuration.put("redirect","tapredirectionwebsdk://") 
        configuration.put("customer",customer)
        configuration.put("interface",interfacee)
        configuration.put("reference",reference)
        configuration.put("metadata","")
        configuration.put("post",post)
        configuration.put("transaction",transaction)
        configuration.put("operator",operator)



        BeneiftPayConfiguration.configureWithTapBenfitPayDictionaryConfiguration(
            this,
            findViewById(R.id.benfit_pay),
            configuration,
           this)


    }


    override fun onSuccess(data: String) {
    }

    override fun onReady() {
        super.onReady()
    }

    override fun onClick() {
        super.onClick()
    }

    override fun onChargeCreated(data: String) {
        super.onChargeCreated(data)
    }

    override fun onOrderCreated(data: String) {
        super.onOrderCreated(data)
    }

    override fun onCancel() {
        super.onCancel()
    }

    override fun onError(error: String) {
    }

}

Generate the hash string
Import the Crypto
Kotlin
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.util.Formatter

Copy this helper singleton class
Kotlin

/// Create a singleton class where you can use as a helper to generate hash strings
object TapHmac {
	/**
     This is a helper method showing how can you generate a hash string when performing live charges
     - Parameter publicKey:             The Tap public key for you as a merchant pk_.....
     - Parameter secretKey:             The Tap secret key for you as a merchant sk_.....
     - Parameter amount:                The amount you are passing to the SDK, ot the amount you used in the order if you created the order before.
     - Parameter currency:              The currency code you are passing to the SDK, ot the currency code you used in the order if you created the order before. PS: It is the capital case of the 3 iso country code ex: SAR, KWD.
     - Parameter post:                  The post url you are passing to the SDK, ot the post url you pass within the Charge API. If you are not using postUrl please pass it as empty string
     - Parameter transactionReference:  The reference.trasnsaction you are passing to the SDK(not all SDKs supports this,) or the reference.trasnsaction  you pass within the Charge API. If you are not using reference.trasnsaction please pass it as empty string
     */
    fun generateTapHashString(publicKey:String, secretKey:String, amount:Double, currency:String, postUrl:String = "", transactionReference:String = ""): String {
        // Let us generate our encryption key
        val signingKey = SecretKeySpec(secretKey.toByteArray(), "HmacSHA256")
        val mac = Mac.getInstance("HmacSHA256")
        mac.init(signingKey)
        // For amounts, you will need to make sure they are formatted in a way to have the correct number of decimal points. For BHD we need them to have 3 decimal points
		val formattedAmount:String = String.format("%.3f", amount)
        // Let us format the string that we will hash
        val toBeHashed = "x_publickey${publicKey}x_amount${formattedAmount}x_currency${currency}x_transaction${transactionReference}x_post$postUrl"
        // let us generate the hash string now using the HMAC SHA256 algorithm
        val bytes = mac.doFinal(toBeHashed.toByteArray())
        return format(bytes)
    }

    private fun format(bytes: ByteArray): String {
        val formatter = Formatter()
        bytes.forEach { formatter.format("%02x", it) }
        return formatter.toString()
    }
}

Call it as follows
Kotlin
val hashString:String = TapHmac.generateTapHashString(publicKey, secretKey, amount, currency, postUrl)

Pass it within the operator model
Kotlin
val operator = HashMap<String,Any>()
operator.put("publicKey","publickKeyValue")
operator.put("hashString",hashString)

Sample Callbacks Responses
onError
Swift
{
    "error":""
}

onOrderCreated
Swift
"ord_uAx145231127yHYS19Ou9B126"

onChargeCreated
Kotlin
{
    {
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "CREATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

}

onSuccess
Kotlin
{
   {
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "UPDATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "description": "",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=8D9e9fdEo5N03hWrGnROvEEFw4DfqYVFv8R7R34GITc%3d",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

}

Parameters Reference

Below you will find more details about each parameter shared in the above tables that will help you easily integrate BenefitPay-Android SDK.

operator

Definition: It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...

Type: string (required)

Fields:

publicKey
Definition: This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.

Example:

Kotlin
 val operator = HashMap<String,Any>()
  operator.put("publicKey","publickKeyValue")
  operator.put("hashString","hashstringValue")

order

Definition: This defines the details of the order that you are trying to purchase, in which you need to specify some details like the ID, amount, currency ...

Type: Dictionary, (required)

Fields:

id
Definition: Pass the order ID created for the order you are trying to purchase, which will be available in your database.
Note: This field can be empty
currency
Definition: The currency which is linked to the order being paid.
amount
Definition: The order amount to be paid by the customer.
Note: The minimum amount to be added is 0.1.
description
Definition: Order details, which define what the customer is paying for or the description of the service you are providing.
reference
Definition: This will be the order reference present in your database in which the payment is being done.

Example:

Kotlin
val order = HashMap<String,Any>()
order.put("id", "")
order.put("amount",  "1" )
order.put("currency","BHD")
order.put("description", "")
order.put("reference", "")



merchant
Definition:It is the Merchant id that you get from our onboarding team. This will be used as reference for your account in Tap.
Type: Dictionary, (required)
Fields:
id :
Definition: Generated once your account with Tap is created, which is unique for every merchant.
Example:
  val merchant = HashMap<String,Any>()
  merchant.put("id", "")

invoice
Definition: After the token is generated, you can use it to pay for any invoice. Each invoice will have an invoice ID which you can add here using the SDK.
Note: An invoice will first show you a receipt/summary of the order you are going to pay for as well as the amount, currency, and any related field before actually opening the payment form and completing the payment.
Type: Dictionary (optional)
Fields:
id
Definition:Unique Invoice ID which we are trying to pay.
_Example:
Kotlin
  val invoice = HashMap<String,Any>()
  invoice.put("id","")

customer
Definition: Here, you will collect the information of the customer that is paying using the token generated in the SDK.
Type: Dictionary (required)
Fields:
id
Definition: This is an optional field that you do not have before the token is generated. But, after the token is created once the card details are added, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.
name
Definition: Full Name of the customer paying.
Fields:
lang
Definition: Language chosen to write the customer name.
first
Definition: Customer's first name.
middle
Definition: Customer's middle name.
last
Definition: Customer's last name.
contact
Definition: The customer's contact information like email address and phone number.
Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.
Fields:
email
Definition: Customer's email address
Note: The email is of type string.
phone
Definition: Customer's Phone number details
countryCode
number
Example:
   /**
   * phone
   */
  val phone = java.util.HashMap<String,Any>()
  phone.put("countryCode","+20")
  phone.put("number","011")


  /**
   * contact
   */
  val contact = java.util.HashMap<String,Any>()
  contact.put("email","test@gmail.com")
  contact.put("phone",phone)
  /**
   * name
   */
  val name = java.util.HashMap<String,Any>()
  name.put("lang","en")
  name.put("first", "first")
  name.put("middle", "middle")
  name.put("last","last")

  /**
   * customer
   */
  val customer = java.util.HashMap<String,Any>()
  customer.put("id", "")
  customer.put("contact",contact)
  customer.put("name", listOf(name))




interface

Definition: This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...

Type: Dictionary (optional)

Fields:

loader
_Definition: _A boolean to indicate wether or not you want to show a loading view on top of the card form while it is performing api requests.
locale
_Definition: _The language of the card form. Accepted values as of now are:
Possible Values:
en(for english)
ar(for arabic).
theme
Definition: The display styling of the card form. Accepted values as of now are:
Options:
light
dark
dynamic ( follow the device's display style )
edges
_Definition: _Control the edges of the payment form.
Possible Values:
curved
flat
colorStyle
Definition: How do you want the icons rendered inside the card form.
Possible Values:
colored
monochrome

Example:

Kotlin
 val interfacee = HashMap<String,Any>()
  interfacee.put("locale","en")
  interfacee.put("theme", "light")
  interfacee.put("edges", "curved")
  interfacee.put("colorStyle","colored")
  interfacee.put("loader",loader)

post
Definition: Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.
Type: Dictionary (optional)
Fields:
url
Definition: The webhook server's URL that you want to receive notifications on.
Example:
Kotlin
   val post = HashMap<String,Any>()
  post.put("url","")



Updated about 1 month ago

iOS
React-Native
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Sample Demo
Step 1: Requirements
Step 2: Get Your Public Keys
Step 3 : Installation
Step 4: Integrating BenefitPay-Android
Integration Flow
Initialising the UI
Step 5: Choose your Integration
Simple Integration
Parameters
Advanced Integration
Generate the hash string
Sample Callbacks Responses
Parameters Reference
operator
order
merchant
invoice
customer
interface
post

URL: https://developers.tap.company/reference/api-endpoint


Tap APIs follow the RESTful architecture, returning all responses in JSON format.

There are two modes available for using Tap APIs: Test and Live. Each mode requires a different API key, which can be generated using the instructions provided in the "Generate API Key" section below.

📘

Integrations:

Looking to integrate your website, eCommerce store or mobile app with Tap Payment Gateway? Visit the Integrations guide to find the right integration method for you.
You can also accept payments without a website or app using goCollect app.
If you are looking for multi-vendor integration, contact the Tap Support Team with your requirements.
API Authentication

To ensure secure authentication, Tap APIs use HTTP Token Authentication. You must provide your API key as the bearer in the Authorization header in the format "Authorization: Bearer YOUR_SECRET_KEY".

Please note that API requests made without proper authentication will fail.

🚧

Watch Out

The Authorization header value should strictly adhere to the format mentioned above. Invalid formats will result in authentication failures.

Few examples of invalid headers are:
BASIC YOUR_SECRET_KEY
basic YOUR_SECRET_KEY
Basic "YOUR_SECRET_KEY"
Basic $YOUR_SECRET_KEY

API Credentials

To generate your Tap API key, follow these steps:

Log in to your Tap Dashboard using your credentials.
Navigate to goSell → API Credentials → Generate Key to view the secret keys for your desired mode.
❗️

Do not share your API Key with anyone or on any public platforms. This can pose security threats for your Tap account.

Updated almost 2 years ago

API Actions
Did this page help you?
Yes
No
TABLE OF CONTENTS
API Authentication
API Credentials

URL: https://developers.tap.company/docs/apple-pay-recurring


Streamlining Secure Recurring Payments with Apple Pay

Apple Pay and tap Integration

Ensure that you have integrated Apple Pay into your application or website. Follow Apple's documentation and tap guidelines to set up Apple Pay on your platform.

Integrate Tap Payments into your application or website to enable payment processing. Refer to Tap Payments documentation for the necessary integration steps.

Apple Pay Payload Availability

Confirm that Apple Pay payload is available and supported by Tap Payments. Check Tap Payments documentation or contact their support team for details on Apple Pay integration and recurring payment capabilities.

Create a Charge Request with tap token

Once Apple Pay payload is available, follow these steps to create a Tap token:

Use the Tap Payments API to initiate a charge request, specifying the necessary parameters including the "save_card" flag set to "true". This allows the card details to be securely stored for recurring payments.

Upon successful charge creation, you will receive a response containing the payment agreement ID, card ID, and customer ID. These details will be required for creating the recurring payment token.

Refer saved card flow for payment agreement ID and related details

Create a New Token

To create a new token for recurring payments, utilize the token endpoint provided by Tap Payments.

Create a recurring charge for Apple Pay

Make sure to include the following parameters while creating a recurring apple pay charge

Set "customer_initiated" to "false" to indicate that the payment is not initiated by the customer but rather by the merchant.

Provide the payment agreement ID received while saving the card via charges API

Process the Transaction

Once the recurring payment token is created, you can use it to process transactions on a recurring basis. Use the Tap Payments API to initiate the transaction, ensuring you include the necessary parameters such as the recurring payment token generated in the previous step.

Tap Payments will handle the payment processing based on the agreed-upon schedule, charging the customer automatically for the recurring service or subscription.

Updated over 1 year ago

Apple Pay Web SDK
Cash Wallet
Did this page help you?
Yes
No
TABLE OF CONTENTS
Apple Pay and tap Integration
Apple Pay Payload Availability
Create a Charge Request with tap token
Create a New Token
Create a recurring charge for Apple Pay
Process the Transaction

URL: https://developers.tap.company/docs/apple-pay-token

Streamlining Secure Payments with Apple Pay Direct Integration

Instructions to keep in mind before you start.

Initial Mapping

TAP issues a 'CSR' file against the merchant keys as a mandatory requirement, that allows the merchant to generate a CER from the ApplePay side. This 'CER' needs to be shared with TAP to synchronize it with the merchant account.
follow steps here

ApplePay token

On click, the merchant needs to get the ApplePay token data generated by Apple. Apple's reference

Sample Date (ApplePay token)

JSON
{
	"data": "CM8i9PNK4yXtKO3",
	"header": {
		"ephemeralPublicKey": "MFkwEwYHKoZIzZHA==",
		"publicKeyHash": "LjAAyv6vOR2uCTHIkB61DaYdEWD+w=",
		"transactionId": "0c4352c073ad460044a3ec5295"
	},
	"signature": "MIAGCSqGSI=",
	"version": "EC_v1"
  }

Getting TAP token

Pass the ApplePay token in the API call and get a TAP token_id in response

API request

Sample request

JSON
Endpoint
{
  "type": "applepay",
  "token_data": {
    "data": "CM8i9PNK4yXtKO3xmOn6uyYOWmQ+iX9/Oc0EWHJZnPZ/IAEe2UYNCfely3dgq3veEygmQcl0s8lvMeCIZAbbBvbZWPKng9lfUwP2u3IUOFfFyI4beE9znpQ/e0nyQiVh8NFyZun8o0/YZfdFhaBy8bunveULZkWODZy3vg1LLTk0wSRfzbiFav/krgeMvztl8U85Fefl1VJVoJbW/jtShwDkusHizw/p/hkLiOFcCYSz7h9culZQMTWfqsxIfTuY3mOl+NhjAHPP+UFv4wefXrQL9MKO2cI6ttXOp5k6M6mFV/Qe0fbmJ6GnDWDMSiikW+3eL0yi0IApAKmmVgPS+uk42dyhrnSPhB6A7EJBmhEEb3ErL1I69Jq9REjDHp+VoZR0fAbDtpbjKKMo",
    "header": {
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELAfDie0Ie1TxCcrFt69BzcQ52+F+Fhm5mDw6pMR54AzoFMgdGPRbqoLtFpoSe0FI/m0cqRMOVM2W4Bz9jVZZHA==",
      "publicKeyHash": "LjAAyv6vb6jOEkjfG7L1a5OR2uCTHIkB61DaYdEWD+w=",
      "transactionId": "0c4352c073ad460044517596dbbf8fe503a837138c8c2de18fddb37ca3ec5295"
    },
    "signature": "MIAGCSqGSIb3DQEHAqCAMIACAQExDzANBglghkgBZQMEAgEFADCABgkqhkiG9w0BBwEAAKCAMIID5jCCA4ugAwIBAgIIaGD2mdnMpw8wCgYIKoZIzj0EAwIwejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE2MDYwMzE4MTY0MFoXDTIxMDYwMjE4MTY0MFowYjEoMCYGA1UEAwwfZWNjLXNtcC1icm9rZXItc2lnbl9VQzQtU0FOREJPWDEUMBIGA1UECwwLaU9TIFN5c3RlbXMxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgjD9q8Oc914gLFDZm0US5jfiqQHdbLPgsc1LUmeY+M9OvegaJajCHkwz3c6OKpbC9q+hkwNFxOh6RCbOlRsSlaOCAhEwggINMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwHQYDVR0OBBYEFAIkMAua7u1GMZekplopnkJxghxFMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUI/JJxE+T5O8n5sT2KGw/orv9LkswggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMA4GA1UdDwEB/wQEAwIHgDAPBgkqhkiG92NkBh0EAgUAMAoGCCqGSM49BAMCA0kAMEYCIQDaHGOui+X2T44R6GVpN7m2nEcr6T6sMjOhZ5NuSo1egwIhAL1a+/hp88DKJ0sv3eT3FxWcs71xmbLKD/QJ3mWagrJNMIIC7jCCAnWgAwIBAgIISW0vvzqY2pcwCgYIKoZIzj0EAwIwZzEbMBkGA1UEAwwSQXBwbGUgUm9vdCBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwHhcNMTQwNTA2MjM0NjMwWhcNMjkwNTA2MjM0NjMwWjB6MS4wLAYDVQQDDCVBcHBsZSBBcHBsaWNhdGlvbiBJbnRlZ3JhdGlvbiBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATwFxGEGddkhdUaXiWBB3bogKLv3nuuTeCN/EuT4TNW1WZbNa4i0Jd2DSJOe7oI/XYXzojLdrtmcL7I6CmE/1RFo4H3MIH0MEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcwAYYqaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZXJvb3RjYWczMB0GA1UdDgQWBBQj8knET5Pk7yfmxPYobD+iu/0uSzAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFLuw3qFYM4iapIqZ3r6966/ayySrMDcGA1UdHwQwMC4wLKAqoCiGJmh0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlcm9vdGNhZzMuY3JsMA4GA1UdDwEB/wQEAwIBBjAQBgoqhkiG92NkBgIOBAIFADAKBggqhkjOPQQDAgNnADBkAjA6z3KDURaZsYb7NcNWymK/9Bft2Q91TaKOvvGcgV5Ct4n4mPebWZ+Y1UENj53pwv4CMDIt1UQhsKMFd2xd8zg7kGf9F3wsIW2WT8ZyaYISb1T4en0bmcubCYkhYQaZDwmSHQAAMYIBjDCCAYgCAQEwgYYwejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTAghoYPaZ2cynDzANBglghkgBZQMEAgEFAKCBlTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0yMDAxMjIxMTE1MjdaMCoGCSqGSIb3DQEJNDEdMBswDQYJYIZIAWUDBAIBBQChCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEIOpHDrXFlLPMYwCXIjWNFUjfzhciVuMVbo/lYkYVLbq0MAoGCCqGSM49BAMCBEcwRQIhAN6zsYadN6EB+PBaRL8fR5IVa320R8InvhGX/VEwQMwjAiBvIT8mVUHcDe4FPRt3KcKfPRVhK2Sc6gT5+vIZjdLCGQAAAAAAAA==",
    "version": "EC_v1"
  },
  "client_ip": "192.168.1.20"
}

API response

A token_id is expected in the API response, and it also contains the card information.

JSON
{
    "id": "tok_CUBiv13xxxx2ZiYP5XXXXX",
    "object": "token",
    "created": 1626080791506,
    "live_mode": true,
    "type": "APPLEPAY",
    "used": false,
    "card": {
        "id": "card_CJXexxxx0124U5y527506",
        "object": "card",
        "funding": "DEBIT",
        "fingerprint":
"33096067e5a3af19xxxxxxxxxce0a467ad2ae4fa2a324af2196c98f85ba25",
        "brand": "VISA",
        "exp_month": 12,
        "exp_year": 23,
        "last_four": "9xx5",
        "first_six": "4xxx12",
        "payment_data_type": "3DSecure"
    }

Charge the Token

Sample to control the source object in the charge API: with "token_id"

JSON
{
...
	"source": {
		"id": "tok_CUBiv13xxxx2ZiYP5XXXXX"
}
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd"
 },
 "redirect": {
    "url": "https://customer.redirection_url"
  }
...
}


Payment would be captured from the card, and the API response would be as status:captured, which Means successfully completed.

Updated over 1 year ago

Apple Pay
Apple Pay Web SDK
Did this page help you?
Yes
No
TABLE OF CONTENTS
Initial Mapping
ApplePay token
Getting TAP token
API request
API response
Charge the Token

URL: https://developers.tap.company/docs/apple-pay-web-sdk


Streamlining Secure Payments with Apple Pay Integration in a Web Environment

Instructions to follow before starting to integrate Apple pay into your mobile or web channel

We provide a web SDK which can be used by merchants to integrate Apple Pay button into the merchant's website using React JS or Vanilla JS. The button can be placed anywhere on the page. On click of the button, Apple Pay payment starts.

Prerequisites

In order for Apple Pay Web SDK to function, the domain name needs to be registered with Tap. Reach out to tap support team and provide your domain name(s) (including list of sub-domain(s)), where you wish to put the Apple Pay button. Once tap registers the domain, your public key respective to the domain will be generated and made available on the tap business dashboard. You will have to provide the respective pk_key and merchant ID inorder to initiate the Apple Pay Web SDK.

The next step is to make sure that the domain verification file is hosted on every domain(s) submitted.

🚧

Host your domain-verification file at the following path for each domain (or sub-domain) before you’re registering the domain with Tap:

https://[DOMAIN_NAME]/.well-known/apple-developer-merchantid-domain-association

The domain-verification file must be in place before you register with Tap

Ensure that the file is accessible via browser at the correct location. Example: https://abc.com/.well-known/apple-developer-merchantid-domain-association

Register Merchant Domain Name with Apple Pay

Tap Payments will register the merchant's domain name with Apple Pay on behalf of the merchant. The merchant needs to provide the domain name to Tap Payments support team for this registration. This step ensures that payments are processed with the Tap Apple Pay certificate without the need for the merchant to have access to Apple Developer portal and hence eliminates the need to share CSR/CER files between the two parties.

The merchant receives from Tap Payments a domain association file that needs to be added in the below path, following the guidelines of Apple.

Path
https://[DOMAIN_NAME]/.well-known/apple-developer-merchantid-domain-association

🚧

Ensure the following are done correctly

The domain name(s) provided for registration should matche the domain(s) where Tap Payments Apple Pay Button SDK(s) are implemented. Any mismatch may result in payment failures.
Ensure that the file is accessible at the correct location. You can visit your own domain path to make sure that the contents of the file are visible through the respective link. Example: https://abc.com/.well-known/apple-developer-merchantid-domain-association
ApplePay Web SDK Integration

We have provided the ApplePay Web SDK codes, in both React JS and Vanilla JS providing merchants with more options depending on the programming language that they are using.

ApplePay Web SDK using React JS

The react module for Apple Pay WEB SDK is available through the NPM registry. Installation is done using the npm install command:

Install the Libraries

This is a React module available through the npm registry. Installation is done using the
npm install command:

console
npm install @tap-payments/apple-pay-button@1.1.6


OR

console
yarn add @tap-payments/apple-pay-button@1.1.6

Example of the React JS Integration Code (ES6)

Below is the React JS example code that you can add in your project, noting that you need to pass the publicKey that is provided by Tap after you have shared the domain of your website.

Tap will also provide you with the merchant.id that needs to be passed in line 14 in the below code block, which represents your account ID at Tap. And make sure that the domain added is the exact one that you have given to Tap to whitelist.

Refer to the Configurations section for the definition of each field.

React JS
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApplePayButton, abortApplePaySession } from '@tap-payments/apple-pay-button'

const App = () => {
	return (
		<ApplePayButton
			debug={false}
			scope='TapToken'
			publicKey='pk_test_Vlk842B1EA7tDN5QbrfGjYzh'
			environment='production'
			merchant={{
				domain: 'demo.staging.tap.company',
				id: '1124340'
			}}
			acceptance={{
				supportedBrands: ['mada', 'masterCard', 'visa']
			}}
			features={{
				supportsCouponCode: false,
			}}
			transaction={{
				currency: 'KWD',
				amount: '20'
                  }}
		 	customer={{
				name: [
					{
						locale: 'en',
						first: 'test',
						last: 'tester',
						middle: 'test'
					}
				],
				contact: {
					email: 'test@gmail.com',
					phone: {
						number: '1000000000',
						countryCode: '+20'
					}
				}
			}}
			interface={{
				locale: 'en',
				theme: 'dark',
				type: 'buy',
				edges: 'curved'
			}}
			onCancel={() => {
				// it's called when the user cancels the payment
				console.log('onCancel')
			}}
			onError={(error) => {
				// it's called when there is an error with the payment
				console.log('onError', error)
			}}
			onReady={() => {
				// it's called when the apple pay button is ready to click
				console.log('onReady')
			}}
			onSuccess={async (data, event) => {
				// it's called when the payment is successful
				console.log('onSuccess', data)
				// event is the same as the event in the onpaymentauthorized event https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentauthorizedevent
				console.log('apple pay event', event)
			}}
		/>
	)
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)

ApplePay Web SDK using Vanilla JS

When implementing the below code, in order to add the ApplePay button on-page in your website, make sure that you pass the publicKey and merchant.id that Tap Payments will provide to you to have it linked to your account. Moreover, please add the domain that you have provided to Tap to whitelist in order to eliminate any errors.

Refer to the Configurations section for the definition of each field.

Vanilla JS
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>apple pay button</title>
    <link rel="stylesheet" href="https://tap-sdks.b-cdn.net/apple-pay/build-1.1.6/main.css" />
    <script src="https://tap-sdks.b-cdn.net/apple-pay/build-1.1.6/main.js"></script>
</head>

<body>
    <div id="apple-pay-button"></div>
    <script type="text/javascript">

        const { render, abortApplePaySession } =
            window.TapApplepaySDK
        render(
            {
                debug: false,
                scope: 'TapToken',
                publicKey: 'pk_test_Vlk842B1EA7tDN5QbrfGjYzh',
                environment: 'production',
                merchant: {
                    domain: 'demo.staging.tap.company',
                    id: '1124340'
                },
                acceptance: {
                    supportedBrands: ['mada','masterCard', 'visa']
                },
                features: {
                    supportsCouponCode: false
                },
                transaction: {
                    currency: 'AED',
                    amount: '20'
                    
                },
                customer: {
                    name: [
                        {
                            locale: 'en',
                            first: 'test',
                            last: 'tester',
                            middle: 'test'
                        }
                    ],
                    contact: {
                        email: 'test@gmail.com',
                        phone: {
                            number: '1000000000',
                            countryCode: '+20'
                        }
                    }
                },
                interface: {
                    locale: 'en',
                    theme: 'dark',
                    type: 'buy',
                    edges: 'curved'
                },
                onCancel: () => {
                    // it's called when the user cancels the payment
                    console.log('onCancel')
                },
                onError: (error) => {
                    // it's called when there is an error with the payment
                    console.log('onError', error)
                },
                onReady: () => {
                    // it's called when the apple pay button is ready to click
                    console.log('onReady')
                },
                onSuccess: async (data, event) => {
                    // it's called when the payment is successful
                    console.log('onSuccess', data)
                    // event is the same as the event in the onpaymentauthorized event https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentauthorizedevent
                    console.log('apple pay event', event)
                }
            'apple-pay-button'
        )
    </script>
</body>

</html>

Specify the Environment

In the Web SDK configuration, you can specify different values to indicate the environment you are working on. Choosing the correct environment based on your development stage is required. To determine the appropriate environment such as development, beta, or production, please refer to the following guidelines:

🚧

Apple Pay Testing Information

You can use both test and live keys in all of the three environments, noting the below:

Using Test Keys: When using test keys, transactions will be processed in a sandbox environment. No real money will be deducted, even if you use a real Apple Pay card. This is ideal for testing the integration without any financial impact.

Using Live Keys: When using live keys, transactions will be processed in a live environment. This means real money will be deducted from the card used in the transaction. Ensure that your integration is thoroughly tested in the sandbox environment before switching to live keys.

Development Environment

Mark the environment as Development when you are still testing in development mode. You can use the test keys in this mode.

JavaScript
publicKey={'pk_test_Vlk842B1EA7tDN5QbrfGjYzh'}
environment={Environment.Development} // or environment='development'
   merchant={{
    domain: 'demo.staging.tap.company',
    id: '1124340',
   }}

Beta Environment

Mark the environment as Beta when you are in the process of QA live testing. This is usually used with live keys and live cards.

JavaScript
publicKey={'pk_live_2nDLY8eJ******VIm936P'} or { 'pk_test_Vlk842B1EA7tDN5QbrfGjYzh'}
environment={Environment.Beta} // or environment='beta'
   merchant={{
    domain: 'demo.staging.tap.company',
    id: '1124340'
   }}

Production Environment

Once your website is in production and accessible to the customers, mark the environment as Production to show that you are fully live and ready to accept live payments with ApplePay.

JavaScript
publicKey={'pk_live_2nDLY8eJ******VIm936P'}
environment={Environment.Production} // or environment='production'
   merchant={{
    domain: 'demo.tap.company',
    id: '1124340'
   }}

👍

The Tap Payments Apple Pay Button SDK is designed to simplify the integration process. It abstracts the complexity of working directly with Apple Pay APIs.

Event Handling in ApplePay Web SDK

Implement the necessary event handling mechanism to capture the click event on the Apple Pay button. In the callback functions, you will see all the actions that are provided by the ApplePay Web SDK, noting that the onSuccess one will give you a result as data if the integration is working well. The data will contain the token ID in the syntax of tok_xxx, that needs to be passed in the source.id of the Charge API to complete the payment with ApplePay.

The below code snippet is available as part of the full ApplePay Web SDK code in the Integration Section.

📘

Refer to the Configurations section for the definition of each callback function

Vanilla JS
React JS
onCancel: () => {
	// it's called when the user cancels the payment
	console.log('onCancel')
},
onError: (error) => {
	// it's called when there is an error with the payment
	console.log('onError', error)
},
onReady: () => {
	// it's called when the apple pay button is ready to click
	console.log('onReady')
},
onSuccess: async (data, event) => {
	// it's called when the payment is successful
	console.log('onSuccess', data)
	// event is the same as the event in the onpaymentauthorized event https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentauthorizedevent
	console.log('apple pay event', event)
},
onMerchantValidation: (status) => {
	// it's called when the merchant validation is done
	console.log('onMerchantValidation', status)
},
onPaymentMethodSelected: async (paymenMethod) => {
	// it's a function that give you a chance to update the total
	// amount and the line items based on the payment method
	return {
		newTotal: {
			label: 'Merchant Name',
			amount: '1.00'
		}
		// you can pass rest of options regarding applepay documentation (https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentmethodupdate)
	}
},
onShippingMethodSelected: async (shippingMehod) => {
	// it's a function that give you a chance to update the total
	// amount and the line items based on the shipping method
	return {
		newTotal: {
			label: 'Merchant Name',
			amount: '1.00'
		}
		// you can pass rest of options regarding applepay documentation (https://developer.apple.com/documentation/apple_pay_on_the_web/applepayshippingmethodupdate)
	}
},
onShippingContactSelected: async (shippingContact) => {
	// it's a function that give you a chance to update the total
	// amount and the line items based on the shipping contact
	return {
		newTotal: {
			label: 'Merchant Name',
			amount: '1.00'
		}
		// you can pass rest of options regarding applepay documentation (https://developer.apple.com/documentation/apple_pay_on_the_web/applepayshippingmethodupdate)
	}
},
onCouponChanged: async (couponCode) => {
	// it's a function that give you a chance to update the total
	// amount and the line items based on the coupon code
	return {
		newTotal: {
			label: 'Merchant Name',
			amount: '1.00'
		}
		// you can pass rest of options regarding applepay documentation (https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentmethodupdate)
	}
}

🚧

Safely store and transmit the token ID as it represents sensitive payment information. Follow industry-standard security practices to protect the token ID and prevent unauthorized access.

Complete the Payment

Construct the Charges API request with the necessary parameters, including the token ID, amount, currency, and any additional information required. Note that the token ID will be available in the callback function onSuccess() after the ApplePay tokenization is done.

📘

Update the user interface based on the status of the charge API response

Handling Charge Status and Error Cases

When creating a charge and interacting with the Tap Payments API, it's essential to handle various charge status scenarios and error cases. This ensures that you can provide appropriate feedback to your users and handle any potential issues gracefully. Follow these guidelines for effective charge status handling:

Successful Charge: If the charge status is CAPTURED, update the user interface to indicate a successful payment. Provide confirmation details such as the transaction ID and any relevant information.

Failed Charge: If the charge status is any other status than CAPTURED, it is not success. Therefore update the user interface to indicate the failure and provide an error message explaining the reason for the failure. It's important to display user-friendly error messages to assist the user in resolving any issues.

Error Handling: In case of any API errors or network failures, handle them gracefully. Display an error message to the user, offering guidance on what to do next. Additionally, consider logging the error details for troubleshooting purposes.

📘

Remember to test the integration thoroughly in a development or staging environment before deploying it to production. This will help identify and address any issues or potential pitfalls in the integration.

Configurations
Name	Type	R/O	Description
publicKey	string	required	The public Key provided by Tap
environment	enum	required	The environment of the SDK and it can be one of these environments: [Development, Production]
debug	boolean	optional	To enable the debug mode
merchant.id	string	required	The merchant identifier provided by Tap
merchant.domain	string	required	The merchant domain name
transaction.amount	string	required	The amount to be charged
transaction.currency	string	required	The currency of the amount
scope	enum	optional	The scope of the SDK
acceptance.supportedBrands	array	optional	The supported networks for the Apple Pay button
acceptance.supportedCards	array	optional	The supported cards for the Apple Pay button
acceptance.supportedCardsWithAuthentications	array	optional	The supported cards with authentications for the Apple Pay button
interface.theme	enum	optional	The theme of the Apple Pay button
interface.locale	Locale	optional	The locale of the Apple Pay button
interface.type	ButtonType	optional	The type of the Apple Pay button
interface.edges	ButtonType	optional	The border of the Apple Pay button
customer	object	required	The Customer details information
onCancel	function	optional	A callback function that will be called when you cancel the process
onError	function	optional	A callback function that will be called when you have an error
onSuccess	function	optional	A async function that will be called after creating the token successfully
onClick	function	optional	A callback function that will be called when the button is clicked
onReady	function	optional	A callback function that will be called when the button is clickable
onMerchantValidation	function	optional	A callback function that will be called when validate merchant callback status changed. available status are initiated, completed, error
onShippingMethodSelected	function	optional	A callback function that will be called when user change shipping method
onShippingContactSelected	function	optional	A callback function that will be called when user change shipping contacts or address
onPaymentMethodSelected	function	optional	A callback function that will be called when user change selected card payment
onCouponChanged	function	optional	A callback function that will be called when user apply new coupon code

Should you encounter any difficulties or have specific questions, reach out to the Tap Payments support team for prompt assistance. Happy integrating!

Updated about 2 months ago

Apple Pay Token
Apple Pay Recurring
Did this page help you?
Yes
No
TABLE OF CONTENTS
Prerequisites
Register Merchant Domain Name with Apple Pay
ApplePay Web SDK Integration
ApplePay Web SDK using React JS
ApplePay Web SDK using Vanilla JS
Specify the Environment
Event Handling in ApplePay Web SDK
Complete the Payment
Handling Charge Status and Error Cases
Configurations

URL: https://developers.tap.company/docs/authorize-and-capture


A Guide for Authorizing and Capturing Transactions

Use the provided API reference links for detailed endpoint documentation.

Create an Authorize Request
Request for the Token ID from the Card Library
Create an Authorize Request
Pass the “Token ID” in the Source.
Pass the desired amount (1 SAR, 0.100 KWD, BHD)
Apply Auto Void after the desired number of hour(s) (This will automatically void the authorize after the set number of hours)
Pass 3DS as True - To Authenticate with 3DS
Pass Customer Initiated as True
Pass Save Card as True - To save the card after a successful card 3DS Authentication and Authorization.
Pass the Customer ID - Generated by the customer API in the customer object.
Pass the correct Merchant ID related to each country.
Pass the Redirect URL to redirect back after the 3DS Authentication
Pass the Post URL to pass the response after the 3DS Authentication
Save the following details from the Authorize Response for future transactions.
Authorize ID
Authorize Status
Customer ID
Capture an Authorized Transaction
Create a Charge Request
Pass the “Authorize ID” in the Source
Pass the desired amount (and the same currency of the Authorize) to Charge. Amount can be less than or equal to the originally authorized amount.
Pass Customer ID
Pass the correct merchant ID related to each country.
Post URL is Optional but recommended to push the info to your backend. Note - you will receive an immediate response, since no authentication will be needed for an authorized transaction.
Save the following details from the Authorize Response for future transactions.
Charge ID
Charge Status
🚧

Ensure that customer_initiated is not set to false, and threeDSecure is not set to false during the capture of an authorized transaction. Payment agreement ID is not required for capturing an authorized transaction.

Updated about 1 year ago

Device Payments
Recommendations & Best Practices
Did this page help you?
Yes
No
TABLE OF CONTENTS
Create an Authorize Request
Capture an Authorized Transaction

URL: https://developers.tap.company/docs/benefitpay-sdk


The popular mobile application in Bahrain that allows users to pay for various services and products using their smartphones. It's a convenient and secure way to make payments without cash or physical cards. BenefitPay can be used to pay bills, groceries, fuel and more at participating merchants in Bahrain.

This guide streamlines the process of accepting transactions on your mobile applications in Bahrain. In this guide, we will walk through the steps to implement, configure, and use Tap Payment’s BenefitPay effectively in iOS and Android

🚧

BenefitPay payment method accepts the BHD currency only. As of now, it doesn't support authorization and save card.

Updated over 1 year ago

Benefit
Web
Did this page help you?
Yes
No

URL: https://developers.tap.company/docs/benefit


Streamlining Secure Payments with Benefit Integration

Benefit is a Bahrain-based payment method that allows customers to make online payments with their Benefit debit cards.

❗️

Benefit does not support authorization transactions

Benefit Integration

You can integrate the Benefit payment method into your website and mobile app through Tap in two ways:

Utilizing our Web Card SDK for a smooth in-app payment flow.
Redirecting users to the Benefit payment page.
📘

In order to enable Benefit on your Tap account, please make sure to contact your account manager or contact us at support@tap.company

Accept Benefit Cards in the Embedded Web SDKs

The first option is mainly for adding Benefit in a web environment, by using one of our Web Card SDKs, either V1 or V2.
Once you enable the Web SDK to accept debit cards, your customers can enter their Benefit card details directly into the SDK, which securely tokenizes the card information.

To complete the payment and deduct the amount from the customer, make sure to pass the token generated (within 5 minutes of creating it), to the source.id field of our create a charge API endpoint, ensuring the currency is set to BHD. Upon calling the API, the payment will have a status of INITIATED. You will then need to open the transaction.url from the charge response in a browser, where the customer can enter their PIN to finalize the transaction, as demonstrated below.

❗️

Benefit only supports payments in BHD

Redirect to Benefit Payment Page

The most common integration method for Benefit is redirecting customers to the Benefit payment page. This approach works for both web and mobile integrations, allowing customers to enter their card details, verify the payment with a PIN sent to their phone, and complete the transaction entirely on the Benefit page.

This option can be done by calling our create a charge API and passing in the source.id field the value src_bh.benefit. Similar to the first option, the payment after calling the charge API, will have a status of INITIATED in the response and you will then need to open the transaction.url from the charge response in a browser, where the customer can enter their PIN to finalize the transaction.

Below is a sample of the charge API request/response to follow in order to achieve the redirection to Benefit page.

Charge API Request

Make sure to call the create a charge API and pass the correct source as well as using currency BHD only.

JSON
{
...
	"currency": "BHD",
	"source": {
		"id": "src_bh.benefit"
}
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd"
 },
 "redirect": {
    "url": "https://customer.redirection_url"
  }
...
}

Charge API Response

A transaction URL is expected in the API response details. This will redirect the customer to the Benefit Payment Page once you open it a browser/webview.

JSON
{
...
"id": "chg_TS05A1320231018Hy56070XXXX",
"status": "INITIATED",
"transaction": {  
	 "timezone": "UTC+03:00",  
	 "created": "1671563769240",  
	 "url": "<https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=d6aPjTalvIV03hWrGnROvO3i8B2ED7hkBbPL8PY%2fzEY%3d">,

 "expiry": {  
 	"period": 30,  
	 "type": "MINUTE"  
	  },  
...
}

Benefit Payment Page Sample

In the image below, you can see how the customer is redirected to the Benefit page to enter their card details and PIN.

Webhook for Final Charge Response

After the customer submits the card details and PIN, and proceeds to Pay with Benefit in either of the options mentioned above, the final charge response with the updated status of the payment, can be viewed using webhook or using the retrieve charge API.

Please refer to the below expected charge response sample.

JSON
Headers
{  
"id": "chg_TS05A1320231018Hy56070XXXX",  
"object": "charge",  
"live_mode": false,  
"customer_initiated": true,  
"api_version": "V2",  
"method": "POST",  
"status": "CAPTURED",  
"amount": 100.0,  
"currency": "BHD",  
"threeDSecure": true,  
"card_threeDSecure": false,  
"save_card": false,  
"merchant_id": "",  
"product": "",  
"statement_descriptor": "Sample",  
"description": "Test Description",  
"metadata": {  
"udf1": "test 1",  
"udf2": "test 2"  
},  
"transaction": {  
"authorization_id": "123456",  
"timezone": "UTC+03:00",  
"created": "1686133093034",  
"expiry": {  
"period": 30,  
"type": "MINUTE"  
},  
"asynchronous": false,  
"amount": 100.0,  
"currency": "BHD"  
},  
"reference": {  
"track": "tck_TS03A1320231018e5D80706659",  
"payment": "1307231018066595165",  
"gateway": "202315888830649",  
"acquirer": "315810000083",  
"transaction": "txn_0001",  
"order": "iphoe_13"  
},  
"response": {  
"code": "000",  
"message": "Captured"  
},  
"gateway": {  
"response": {  
"code": "00",  
"message": "CAPTURED"  
}  
},  
"receipt": {  
"id": "201307231018065637",  
"email": true,  
"sms": false  
},  
"customer": {
    "id": "cus_TS020920221916q8YJ2012896",
    "first_name": "Waleed",
    "last_name": "Asghar",
    "email": "w.asghar@tap.company",
    "phone": {
      "country_code": "971",
      "number": "586275033"
}
},  
"merchant": {  
"country": "BH",  
"currency": "BHD",  
"id": "18695485"  
},  
"source": {  
"object": "source",  
"type": "CARD_NOT_PRESENT",  
"payment_type": "DEBIT",  
"payment_method": "BENEFIT",  
"channel": "INTERNET",  
"id": "src_bh.benefit"  
},  
"redirect": {  
"status": "PENDING",  
"url": "checkout.com/website"  
},  
"post": {  
"attempt": 1,  
"status": "PENDING",  
"url": "<https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd>"  
},  
"activities": [  
{  
"id": "activity_TS02A1320231018Xe560706737",  
"object": "activity",  
"created": 1686133093034,  
"status": "INITIATED",  
"currency": "BHD",  
"amount": 100.0,  
"remarks": "charge - created"  
},  
{  
"id": "activity_TS06A0620231019Jw150706351",  
"object": "activity",  
"created": 1686133146351,  
"status": "CAPTURED",  
"currency": "BHD",  
"amount": 100.0,  
"remarks": "charge - captured"  
}  
],  
"auto_reversed": false  
}

Benefit Card Saving
🚧

Saved Benefit cards can be used for future customer-initiated transactions, though a PIN will need to be entered each time.

Tap now supports tokenization and saving of Benefit Cards, improving both the payment experience and acceptance rates. After capturing the first payment with Benefit and setting "save_card": true in the charge request, you'll receive a customer ID (cus_xxx) and card ID (card_xxx) in the response. These can be used for future transactions with the saved card.

Instead of re-entering card details, you can generate a token for the saved card. Pass this token (tok_xxx) to the source.id field of the charge API. The customer will only need to enter their PIN by accessing the transaction.url provided in the response to complete the payment.

Updated 5 months ago

OmanNet
Benefit Pay
Did this page help you?
Yes
No
TABLE OF CONTENTS
Benefit Integration
Accept Benefit Cards in the Embedded Web SDKs
Redirect to Benefit Payment Page
Webhook for Final Charge Response
Benefit Card Saving

URL: https://developers.tap.company/reference/cancel-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Cancel an Invoice
DELETE
https://api.tap.company/v2/invoices/{invoice_id}
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
invoice_id
string
required

optional

RESPONSES
200

200

400

400

Updated over 1 year ago

Update an Invoice
Remind an Invoice
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request DELETE \
2
     --url https://api.tap.company/v2/invoices/invoice_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/card-payments-integration-flow


Integration Flow (mada, Visa, Mastercard)

Preparation

Insert the Card Library into your project to collect card details and obtain a “Token ID”

Save Card - with an Authorize Transaction
Request for the Token ID from the Card Library
Create an Authorize Request
Pass the “Token ID” in the Source.
Pass a small amount (1 SAR, 0.100 KWD, BHD)
Apply Auto Void after 1 hour - To auto void the amount
Pass 3DS as True - To Authenticate with 3DS
Pass Customer Initiated as True
Pass Save Card as True - To save the card after a successful card 3DS Authentication and Authorization.
Pass the Customer ID - Generated by the customer API in the customer object.
Pass the correct MID related to each country.
Pass the Redirect URL to redirect back after the 3DS Authentication
Pass the Post URL to pass the response after the 3DS Authentication
Save the following details from the Authorize Response for future transactions.
Authorize ID
Authorize Status
Card ID
Customer ID
Payment Agreement ID
Manage Cards - Saved for your Customers

Retrieve the List of Cards under the Customer with the List of Card API using the Customer ID.

Transaction - Charge with a Saved Card

“Create a Token for a Saved Card” using the “Card ID”

Pass Card ID
Pass Customer ID

Step 2 - Create a Charge

Pass “Token ID” in the Source
Pass the amount to Charge
SAR currency is required for Mada
Pass 3DS as False
Pass Customer Initiated as False
Pass Save Card as False
Pass Customer ID
Pass Payment Agreement ID
Pass the correct MID related to each country.
No Post URL is Optional but recommended to push the info to your backend. Note - you will receive an immediate response, since no authentication will be needed with a Saved Card linked to a Payment Agreement.

Save the following details from the Authorize Response for future transactions.

Charge ID
Charge Status
Transaction - Authorize with a Saved Card

“Create a Token for a Saved Card” using the “Card ID”

Pass Card ID
Pass Customer ID

Create an Authorize

Pass “Token ID” in the Source
Pass the amount to Authorize
Apply Auto Charge after X Hours (Recommended to apply “X” as your estimated delivery time plus a buffer,
in order to void if necessary prior to the estimated delivery time. This will avoid the need to perform a Refund)
Pass 3DS as False
Pass Customer Initiated as False
Pass Save Card as False
Pass Customer ID
Pass Payment Agreement ID
Pass the correct MID related to each country.
No Post URL is Optional but recommended to push the info to your backend. Note - you will receive an immediate response, since no authentication will be needed with a Saved Card linked to a Payment Agreement.

Step 3 - Save the following details from the Response

Authorize ID
Authorize Status

Step 4 (Only if you want to Void an Authorize) - Create a Void

Authorize ID

Updated over 1 year ago

User Access Permissions
Redirect Payments
Did this page help you?
Yes
No
TABLE OF CONTENTS
Preparation
Save Card - with an Authorize Transaction
Manage Cards - Saved for your Customers
Transaction - Charge with a Saved Card
Transaction - Authorize with a Saved Card

URL: https://developers.tap.company/docs/cards

Visa, Mastercard, American Express, Omannet, Benefit and Mada cards will be covered under the card payment method.

You can pass the token id to charge the above cards or you can pass the source as "src_card" to collect the cards and processed them by Tap.

Card	VISA	MasterCard	AMEX	mada
Payment Type	DEBIT, CREDIT	DEBIT, CREDIT	CREDIT	DEBIT
Payment Acceptance	Local, Regional, Global	Local, Regional, Global	Local, Regional, Global	Local
Redirect Payment Flow

Your customer must redirected to the 3D Secure page provided by issuer to authenticate the payment.

3D secure transactions work with Redirect payment flow. Charge or Authroze API will return the payment url (transaction.url) in the response object. Customer should be redirected to this payment url, to complete the payment process.

Merchant url (redirect.url) is required in the Charge request.

Initial charge or authorize status will be "PENDING". After payment completed, charge status will be confirmed immediately. So you can use the retrieve charge or authorize API to get the status.

Direct Payment Flow

If the credit card is not enrolled for 3D secure, then Tap process the payment and will return the confirmed payment status in the charge response. The payment url will not be available in the API response.

Updated 6 months ago

Card Payments
Google Pay
Did this page help you?
Yes
No
TABLE OF CONTENTS
Redirect Payment Flow
Direct Payment Flow

URL: https://developers.tap.company/reference/create-a-charge

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Create a Charge
POST
Retrieve a Charge
GET
Update a Charge
PUT
List all Charges
POST
Download Charges
POST
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Charge
POST
https://api.tap.company/v2/charges/

This endpoint initiates a charge request to charge a credit card or any other payment source.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

If your API key is in test mode, the provided payment source (e.g., test card) will not be charged, although all other operations will be treated as if in live mode (Tap assumes that the charge would have been completed successfully.)

BODY PARAMS
amount
float
required
Defaults to 1

The amount to be collected by this payment, in ISO standard decimal places. A positive decimal representing how much to charge in the currency unit (e.g: 100 to charge $100 and 100.5 to charge $100.50). The minimum amount is $0.100 for any charge currency.

currency
string
required
Defaults to KWD

Three-letter ISO currency code, in uppercase. Must be a supported currency.

customer_initiated
boolean
Defaults to true

This parameter determines whether the charge was initiated by customer or not

true
false
threeDSecure
boolean
Defaults to true

The 3D Secure request status for a particular charge. Values can be either true or false.

true
false
save_card
boolean
Defaults to false

Payer can save credit cards for future purpose but a customer phone number is required to save the card. Values can be either be True or False. In order to use this feature, save card feature needs to be activated on the Merchant Account.

true
false
payment_agreement
object

Serves as a unique identifier for referencing and managing the payment agreement

PAYMENT_AGREEMENT OBJECT
description
string
Defaults to Test Description

An arbitrary string which you can attach to a Charge request with more details, if needed.

order
object

The object represents a specific order information such as order ID of the related transaction.

ORDER OBJECT
metadata
object

The set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

METADATA OBJECT
receipt
object

Note: this feature is no longer supported

RECEIPT OBJECT
reference
object

The reference numbers related to the charge.

REFERENCE OBJECT
customer
object
required

The details about the customer who will be performing the transaction.

CUSTOMER OBJECT
merchant
object

The ID of the Merchant Account. Available on the Tap Dashboard (goSell > API Credentials > Merchant ID)

MERCHANT OBJECT
source
object
required

The details about the payment method at the time of the transaction. Possible values: for local payment methods, use the respective source_id. Example: For KNET, use src_kw.knet; for capturing a token, use the token_id; to authorize an existing authorized transaction use the authorize_id; to display all payment methods in a Tap hosted page, use src_all; to display only the card payment methods in a Tap hosted page, use src_card; for capturing from saved card for customer, create a token by using Create a Token API (make sure to pass customer_id in the customer object); . Refer to Payment Methods guide for more information.

SOURCE OBJECT
post
object

The Webhook URL. After payment is completed, Tap will POST the response payload as a raw data to this URL.

POST OBJECT
redirect
object
required

After payment is completed, payer will be redirected to this URL (KNET, mada and 3D secure charge requests requires Redirect URL)

REDIRECT OBJECT
payment_provider
object

Information about the payment provider associated with this charge

PAYMENT_PROVIDER OBJECT
platform
object

The Platform parameter identifies the platform under which the merchant is operating, linking the transaction to the appropriate platform.

PLATFORM OBJECT
RESPONSES
200

200

400

400

Updated 20 days ago

Charges
Retrieve a Charge
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/charges/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "amount": 1,
9
  "currency": "KWD",
10
  "customer_initiated": true,
11
  "threeDSecure": true,
12
  "save_card": false,
13
  "description": "Test Description",
14
  "metadata": {
15
    "udf1": "Metadata 1"
16
  },
17
  "receipt": {
18
    "email": false,
19
    "sms": false
20
  },
21
  "reference": {
22
    "transaction": "txn_01",
23
    "order": "ord_01"
24
  },
25
  "customer": {
26
    "first_name": "test",
27
    "middle_name": "test",
28
    "last_name": "test",
29
    "email": "test@test.com",
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
200 - Charge Response With Payment Agreement
400 - Result

URL: https://developers.tap.company/reference/create-a-connect-url

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Create a Lead
POST
Retrieve a Lead
GET
Create a Connect URL
POST
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Connect URL
POST
https://api.tap.company/v3/connect

This endpoint converts a lead into a connect URL which the merchant can complete the onboarding process.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
scope
string
required
Defaults to merchant

Authenticating the lead created and converting it to an account if all validation rules are met

data
array of strings
Defaults to operation,brand,entity,merchant

Array of data to be sent by connect after account creation to the post url: "operation" , "brand" , "entity" , "merchant"

STRING
STRING
STRING
STRING
ADD STRING
lead
object
required

Contains information about the lead

LEAD OBJECT
board
object

Configuration settings related to the display and editability of interface

BOARD OBJECT
redirect
object
required

Redirection page following the account creation & board

REDIRECT OBJECT
post
object
required

URL where the webhook is set up.

POST OBJECT
webhook
object

URL where the webhook is set up.

WEBHOOK OBJECT
interface
object

Configuration settings for customizing the appearance and behavior of the interface

INTERFACE OBJECT
RESPONSES
200

200

400

400

Updated 6 months ago

Retrieve a Lead
Business
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v3/connect \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "scope": "merchant",
9
  "data": [
10
    "operation",
11
    "brand",
12
    "entity",
13
    "merchant"
14
  ],
15
  "lead": {
16
    "id": "led_xxxx"
17
  },
18
  "board": {
19
    "editable": true,
20
    "display": true
21
  },
22
  "redirect": {
23
    "url": "http://example.com/redirectUrl"
24
  },
25
  "post": {
26
    "url": "http://example.com/postUrl"
27
  },
28
  "webhook": {
29
    "url": "http://example.com/webhookUrl"
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-a-customer

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Customer
POST
https://api.tap.company/v2/customers

This endpoint creates a customer.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
first_name
string
Defaults to test

Customer first name

middle_name
string
Defaults to test

Customer middle name

last_name
string
Defaults to test

Customer last name

email
string
Defaults to test@test.com

Customer email address

phone
object

Customer phone number

PHONE OBJECT
description
string
Defaults to test

An arbitrary string attached to the object. Often useful for displaying to users.

metadata
object

Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format.

METADATA OBJECT
currency
string
Defaults to KWD

Three-letter ISO code for the currency the customer can be charged

title
string

Customer title

nationality
string

Nationality of customer

RESPONSES
200

200

400

400

Updated almost 2 years ago

Customers
Retrieve a Customer
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/customers \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "first_name": "test",
9
  "middle_name": "test",
10
  "last_name": "test",
11
  "email": "test@test.com",
12
  "phone": {
13
    "country_code": "965",
14
    "number": "51234567"
15
  },
16
  "description": "test",
17
  "metadata": {
18
    "sample string 1": "string1",
19
    "sample string 3": "string2"
20
  },
21
  "currency": "KWD"
22
}
23
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-a-lead

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Create a Lead
POST
Retrieve a Lead
GET
Create a Connect URL
POST
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Lead
POST
https://api.tap.company/v3/connect/lead/

This endpoint creates a lead.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
brand
object
required

Information about the brand associated with this lead

BRAND OBJECT
entity
object

Information about the entity associated with this lead

ENTITY OBJECT
wallet
object

Information about the wallet associated with this lead

WALLET OBJECT
user
array of objects

Information about the user associated with this lead

ADD OBJECT
post
object

The URL for posting updates

POST OBJECT
metadata
object

The set of key-value pairs that you can attach to an object. This can be useful for storing additional information in a structured format.

METADATA OBJECT
platforms
array of strings

Platform ID where the merchant will be created under

ADD STRING
payment_provider
object

Information about the provider associated with this lead

PAYMENT_PROVIDER OBJECT
RESPONSES
200

200

400

400

Updated 2 months ago

Lead
Retrieve a Lead
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v3/connect/lead/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "brand": {
9
    "name": {
10
      "en": "merchantNameEn",
11
      "ar": "merchantNameAr"
12
    },
13
    "sector": [
14
      "telecom",
15
      "finance"
16
    ],
17
    "logo": "file_656848322076980748",
18
    "operations": {
19
      "sales": {
20
        "period": "monthly",
21
        "range": {
22
          "from": "10000",
23
          "to": "80000"
24
        },
25
        "currency": "AED"
26
      }
27
    },
28
    "segment": {
29
      "type": {
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-a-refund

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
Create a Refund
POST
Retrieve a Refund
GET
Update a Refund
PUT
List All Refunds
POST
Download Refunds
POST
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Refund
POST
https://api.tap.company/v2/refunds/

Creating a refund request

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.

Payment reference will be controlled with "charge_id: "chg_xxxxxxxxxxxxx".

API allows to control the amount. Either a full or Partial.

A justified reason should be added in the API call to avoid any future confusion about the refund.

BODY PARAMS
charge_id
string
required
Defaults to chg_TS02A1720241236y4M42101629

Original Charge ID, provided in the Charge API request

amount
int32
required
Defaults to 10

Refund amount (For currencies BHD, KWD, and OMR, amount should be specified with up to 3 decimal places. For others, amount should be specified with up to 2 decimal places)

currency
string
required
Defaults to KWD

Currency code, Three digit ISO code (KWD, USD,..)

reason
string
required
Defaults to The product is out of stock

Reason for refund (possible values are duplicate, fraudulent, and requested_by_customer)

destinations
object

If you are marketplace and you want to send refund request by adding the destinations object

DESTINATIONS OBJECT
post
object

The Webhook URL. After refund is completed, Tap will POST the response payload as a raw data to this URL.

POST OBJECT
metadata
object

The set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

METADATA OBJECT
reference
object

The reference numbers related to the charge.

REFERENCE OBJECT
RESPONSES
200

200

400

400

Updated about 2 months ago

Refund
Retrieve a Refund
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/refunds/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "charge_id": "chg_TS02A1720241236y4M42101629",
9
  "amount": 10,
10
  "currency": "KWD",
11
  "reason": "The product is out of stock",
12
  "post": {
13
    "url": "http://your_website.com/post_url"
14
  },
15
  "metadata": {
16
    "key": "value"
17
  },
18
  "reference": {
19
    "merchant": "1234"
20
  }
21
}
22
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-applepay-tap-token

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Token (Apple Pay token)
POST
https://api.tap.company/v2/tokens/

Merchants can create the Token ID by passing the Apple Pay encrypted payment token, which is obtained directly from Apple Pay

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
type
string
Defaults to applepay

Token type (applepay)

token_data
object
TOKEN_DATA OBJECT
client_ip
string
Defaults to 192.168.1.20

Client IP Address

RESPONSES
200

200

400

400

Updated 5 months ago

Create a Token (Saved Card)
Create a Token (Samsungpay token)
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/tokens/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "type": "applepay",
9
  "token_data": {
10
    "data": "CM8i9PNK4yXtKO3xmOn6uyYOWmQ+iX9/Oc0EWHJZnPZ/IAEe2UYNCfely3dgq3veEygmQcl0s8lvMeCIZAbbBvbZWPKng9lfUwP2u3IUOFfFyI4beE9znpQ/e0nyQiVh8NFyZun8o0/YZfdFhaBy8bunveULZkWODZy3vg1LLTk0wSRfzbiFav/krgeMvztl8U85Fefl1VJVoJbW/jtShwDkusHizw/p/hkLiOFcCYSz7h9culZQMTWfqsxIfTuY3mOl+NhjAHPP+UFv4wefXrQL9MKO2cI6ttXOp5k6M6mFV/Qe0fbmJ6GnDWDMSiikW+3eL0yi0IApAKmmVgPS+uk42dyhrnSPhB6A7EJBmhEEb3ErL1I69Jq9REjDHp+VoZR0fAbDtpbjKKMo",
11
    "header": {
12
      "transactionId": "0c4352c073ad460044517596dbbf8fe503a837138c8c2de18fddb37ca3ec5295",
13
      "publicKeyHash": "LjAAyv6vb6jOEkjfG7L1a5OR2uCTHIkB61DaYdEWD+w=",
14
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELAfDie0Ie1TxCcrFt69BzcQ52+F+Fhm5mDw6pMR54AzoFMgdGPRbqoLtFpoSe0FI/m0cqRMOVM2W4Bz9jVZZHA=="
15
    },
16
    "signature": "bNEa18hOrgG/oFk/o0CtYR01vhm+34RbStas1T+tkFLpP0eG5A+9P7k9eYq8OL5q+V8xyRWrG8YcsV9JaHA32hNjS1UAPalnClSnrn2SXimafLGPv4OaImH/Ta9uuKPVdJAfa26UDtAYhlsXiBY5MAVytRUl+Cec5DkmihNwI7GJaR6mD1Hlz+7AFrHL31R+hPM4lVp3yJKsZYFzadUKpzZpjhub6iQG81WhN2LcBEpbf13ksOYHpUWpKaa9YHxpO2CnIGzEWwdxD8nFkWyEeCt/mFs1Lq504diIBaq57p+nNX+Iydy9LIsM4TvT4dj5Dv5gn5A3gbcEIuR3hcw+HWp",
17
    "version": "EC_v1"
18
  },
19
  "client_ip": "192.168.1.20"
20
}
21
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-a-token

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Token (Card)
POST
https://api.tap.company/v2/tokens

This endpoint creates a single-use token that securely contains the details of a credit card.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

This token can serve as a stand-in for a source in the Charges, Authorize, or Card API but it's important to note that these tokens can only be used once within a few minutes of creation. Please be aware that a PCI compliance certificate is required to use this endpoint. For more information, please contact our team. However, you can also create tokens using our Card Web SDK without needing to meet PCI compliance requirements.

BODY PARAMS
card
object

Card object. Ensure that your business account has the access to use this API.

CARD OBJECT
client_ip
string
Defaults to 192.168.1.20

The IP Address of the client.

RESPONSE
200

200

Updated almost 2 years ago

Tokens
Create a Token (Encrypted Card)
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/tokens \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "card": {
9
    "number": 4508750015741019,
10
    "exp_month": 1,
11
    "exp_year": 2039,
12
    "cvc": 100,
13
    "name": "test user",
14
    "address": {
15
      "country": "Kuwait",
16
      "line1": "Salmiya, 21",
17
      "city": "Kuwait city",
18
      "street": "Salim",
19
      "avenue": "Gulf"
20
    }
21
  },
22
  "client_ip": "192.168.1.20"
23
}
24
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result

URL: https://developers.tap.company/reference/create-a-token-encrypted-card

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Token (Encrypted Card)
POST
https://api.tap.company/v2/tokens/

This endpoint creates a token to securely store sensitive card information.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

Tap's Encrypted Card Token endpoint provides a secure and simple way to store sensitive credit card information. The RSA algorithm is utilized for encryption and decryption, which is an asymmetric cryptographic algorithm.

To protect the customer's card information, it's encrypted using a public key and decrypted using a secret key. Please note that these tokens can only be used once, and they can be utilized in place of a source in the Charges, Authorize, or Card API.

Apple Pay can also use this endpoint by encrypting the "decrypted Apple payment data" to generate the token.

A test encryption key is available in the Test API Keys section for experimentation. However, please be aware that a PCI compliance certificate is required to access this endpoint. For more information, please contact our team. Alternatively, you can also create tokens using our JS Elements without the need to meet PCI compliance requirements.

This is the format to encrypt the card data

Text
{"number": “5123450000000008”, "exp_month": “01”, "exp_year": “2039”, "cvc": “100”, "name": "test user"}

BODY PARAMS
card
object

Card object

CARD OBJECT
RESPONSES
200

200

400

400

Updated about 1 year ago

Create a Token (Card)
Create a Token (Saved Card)
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/tokens/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "card": {
9
    "address_city": "Some city",
10
    "address_country": "Some country",
11
    "address_line1": "First line",
12
    "address_line2": "Second line",
13
    "address_state": "Royal State",
14
    "address_zip": "007",
15
    "crypted_data": "Z6cYic0X0I71h9ABUxreudcF76iz5uthier1Ec4YPVv0WsId+F1DbeU0llRgrnXTlGtzzrmWiP+I8owc+Zq0GiYbFYs4se0zYcfLEqDrXgdGiQ+X0v8rwObhD/4ef+OARLrH/rfka0mVxtzTMGzxRivGlLQy27qyj0KtS+/ShY4TQ930iGVOzFOn5VdL8w1H/b6+9bgKtMlD8tGqy624Q2uz8pVHyGvmpuEa0yPoJEjYGC/9qUI6/KQXDw9EWw4ZbhwXNBKNFTUJjvvVcrMVpvktS3/T0PYFCRIpKXvY7wEXewrqG9/nDochyzjJtWPTz/eQ+bl8D26HXqgmb8gjoQ=="
16
  }
17
}
18
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-samsungpay-token

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Token (Samsungpay token)
POST
https://api.tap.company/v2/tokens/

Merchants can create the Token ID by passing the Samsung Pay encrypted payment token, which is obtained directly from Samsung Pay

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
type
string
Defaults to samsungpay

Token type (samsungpay)

token_data
object

The object that contains the encrypted data

TOKEN_DATA OBJECT
RESPONSES
200

200

400

400

Updated about 2 months ago

Create a Token (Apple Pay token)
Retrieve a Token
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/tokens/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "type": "samsungpay"
9
}
10
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-a-token-from-saved-card

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create a Token (Saved Card)
POST
https://api.tap.company/v2/tokens

This endpoint creates a token using a saved card id, but this requires a Card ID and Customer ID.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

It's important to be aware that these tokens can only be used once, and they can be used in place of a source in the Charges or Authorize API.

To use a saved card in a charge or authorize request API, you must first create a token and then pass the Token ID in the source object.

It's crucial to remember that a Saved Card ID will not be accepted as valid input in a charge or authorization request.

BODY PARAMS
saved_card
object

Saved Card object

SAVED_CARD OBJECT
client_ip
string
Defaults to 127.0.0.1

IP address of the client

RESPONSES
200

200

400

400

Updated almost 2 years ago

Create a Token (Encrypted Card)
Create a Token (Apple Pay token)
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/tokens \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "saved_card": {
9
    "card_id": "card_RtPG1623834SD1e278H2q99",
10
    "customer_id": "cus_TS01A3020231134Ks4x2703949"
11
  },
12
  "client_ip": "127.0.0.1"
13
}
14
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/create-an-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create an Authorize
POST
https://api.tap.company/v2/authorize/

This endpoint authorizes a transaction.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.

To place a hold on a card, use the Authorize API. You can later capture the payment or release the hold. To authorize a card, create an authorization request. If in test mode, the card won't be authorized, but everything else will occur as if in live mode.

To automatically capture the authorized payment after a defined number of hours, you can use the auto object and set the type to AUTO. Alternatively if the type is VOID, the authorization hold will be released after the predefined time.

To capture an authorized payment, you can use Charges API. You can pass the authorize_id within the source_id of the charges request.

Please review the Authorization Request and Authorization Response Model to get more information.

BODY PARAMS
amount
int32
Defaults to 1

The amount to be authorized in decimal format. (Eg: 3.990)

currency
string
Defaults to KWD

The currency in which the amount should be authorized in standard 3 digit ISO currency code. (Eg: USD)

customer_initiated
boolean
Defaults to true

This parameter determines whether the charge was initiated by customer or not

true
false
threeDSecure
boolean
Defaults to true

The 3D Secure request status for a particular authorized payment. Values can either be true or false.

true
false
save_card
boolean
Defaults to false

The credit card of the payer can be saved for future transactions. Values can be either true or false.

true
false
payment_agreement
object

Serves as a unique identifier for referencing and managing the payment agreement

PAYMENT_AGREEMENT OBJECT
statement_descriptor
string
Defaults to sample

The description to be added to the statement.

receipt
object

Note: This feature is longer supported.

RECEIPT OBJECT
metadata
object

Any additional set of information as key/value pairs to be added to the authorization request. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.

METADATA OBJECT
reference
object

The reference numbers associated with this authorize request.

REFERENCE OBJECT
customer
object

The customer information.

CUSTOMER OBJECT
merchant
object

The ID of the Merchant Account. Available on the Tap Dashboard (goSell > API Credentials > Merchant ID)

MERCHANT OBJECT
source
object

The source of the payment method that needs to be authorized.

SOURCE OBJECT
authorize_debit
boolean
Defaults to false

A boolean parameter that accepts values true or false. If set to true, the API will process the transaction even if it is not supported by the payment network. It is important to note that currently, this feature is only supported for mada transactions.

true
false
auto
object

The type and duration of the authorization.

AUTO OBJECT
post
object

The URL to which tap needs to send the response once the authorize is completed.

POST OBJECT
redirect
object

The URL to which the customer needs to be redirected once the authorize is completed.

REDIRECT OBJECT
payment_provider
object

Information about the payment provider associated with this authorize

PAYMENT_PROVIDER OBJECT
RESPONSES
200

200

400

400

Updated 13 days ago

Authorize
Retrieve an Authorize
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/authorize/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "amount": 1,
9
  "currency": "KWD",
10
  "customer_initiated": true,
11
  "threeDSecure": true,
12
  "save_card": false,
13
  "statement_descriptor": "sample",
14
  "receipt": {
15
    "email": true,
16
    "sms": true
17
  },
18
  "metadata": {
19
    "udf1": "test_data_1",
20
    "udf2": "test_data_2",
21
    "udf3": "test_data_3"
22
  },
23
  "reference": {
24
    "transaction": "txn_0001",
25
    "order": "ord_0001"
26
  },
27
  "customer": {
28
    "first_name": "Test",
29
    "middle_name": "Test",
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
200 - Initiated With Payment Agreement
200 - Authorized Response With Payment Agreement
400 - Result

URL: https://developers.tap.company/reference/create-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Create an Invoice
POST
https://api.tap.company/v2/invoices/
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
draft
boolean
Defaults to false

Merchant can save the invoice without creating the actual invoice. The default value will be false.

true
false
due
double
required
Defaults to 1672235072000

Invoice Due Date; measured in seconds since the Unix epoch.

expiry
double
required
Defaults to 1672235072000

Invoice Expiry Date; measured in seconds since the Unix epoch.

description
string
Defaults to test invoice

Invoice description.

mode
string
Defaults to INVOICE

Invoice mode- how the invoice page is showed to customers (INVOICE - Open invoice page, PAY - Open payment page, INVOICEPAY - Open invoice page and payment page.

note
string
Defaults to test note

It will be added to the invoice footer.

notifications
object

Notification object. By default, the invoice will be dispatched automatically.

NOTIFICATIONS OBJECT
currencies
array of strings
Defaults to KWD

Currencies object. If you pass a null or empty value for the charge currency object, all available currencies will be displayed.

STRING
ADD STRING
metadata
object

Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.

METADATA OBJECT
charge
object

Charge Object.

CHARGE OBJECT
customer
object
required

Customer object; either customer ID or customer information is required.

CUSTOMER OBJECT
statement_descriptor
string
Defaults to test
order
object
required

Order object; either order ID or order information is required

ORDER OBJECT
payment_methods
array of strings

Charge payment method object. If you pass a null or empty value, then all available payment methods will be displayed and If you want to send link with specific payment method you can add "BENEFIT","VISA", "MASTERCARD", "APPLE_PAY"

ADD STRING
post
object

Post url object.

POST OBJECT
redirect
object

Redirect url object.

REDIRECT OBJECT
reference
object

Merchant reference object.

REFERENCE OBJECT
retry_for_captured
boolean
Defaults to true

When set to false, the default behavior shifts, redirecting customers to the merchant's designated "redirect.url" instead of the invoice page upon an unsuccessful transaction.

true
false
payment_provider
object

Information about the payment provider associated with this invoice

PAYMENT_PROVIDER OBJECT
HEADERS
lang_code
string

optional

RESPONSES
200

200

400

400

Updated 5 months ago

Invoices
Retrieve an Invoice
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/invoices/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "draft": false,
9
  "due": 1672235072000,
10
  "expiry": 1672235072000,
11
  "description": "test invoice",
12
  "mode": "INVOICE",
13
  "note": "test note",
14
  "notifications": {
15
    "channels": [
16
      "SMS",
17
      "EMAIL"
18
    ],
19
    "dispatch": true
20
  },
21
  "currencies": [
22
    "KWD"
23
  ],
24
  "metadata": {
25
    "udf1": "1",
26
    "udf2": "2",
27
    "udf3": "3"
28
  },
29
  "charge": {
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/creating-payment-agreement

ACCEPTANCE
Saved Cards
Payment Agreement and Contracts
Creating Payment Agreement
Merchant Initiated Transaction
Liability Shift: Customer vs Merchant
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Creating Payment Agreement

To streamline the creation of payment agreements, Tap Payments offers two methods:

Charge API: This method integrates the creation of a payment agreement directly into the charging process. When initiating an order or subscription, specifying the agreement type will prompt Tap Payments to automatically generate the agreement, providing an agreement ID (payment_agreement.id) for the customer's card.

Payment Agreement API: Alternatively, merchants can employ a dedicated API for more granular control, allowing them to create a payment agreement and associate it with the customer's card independently. (This API is currently in beta, with a full launch anticipated shortly.)

Payment Agreement Object

The payment agreement object details the terms of the agreement between the merchant and the customer regarding the use of a saved card.

json
"payment_agreement": {  
		"id": "payment_agreement_TS05A0920230152Hj2e2105495",  
		"total_payments_count": 2,  
		"contract": {  
			"id": "card_3NgY56232243uLD920sA4n697",  
			"type": "UNSCHEDULED"  
		},  
		"variable_amount": {  
			"id": "variable_amount_TS05A0920230152a0F22105495"  
		}  
	}


Here is an explanation of each attribute within the payment agreement object:

Parameter	Description	Example
id	Serves as a unique identifier for referencing and managing the payment agreement.	payment_agreement_TS05A0920230152Hj2e2105495
total_payments_count	Tracks the total number of payments made under this agreement.	2
contract	Represents the unique identifier for the associated contract, helping in identification and referencing.	
contract.id	Uniquely identifies the agreement between the merchant and the customer, using an invoice ID, subscription ID, card ID, or order ID.	card_3NgY56232243uLD920sA4n697
contract.type	Specifies the type of contract, such as "UNSCHEDULED" in this instance, indicating non-recurring payments.	UNSCHEDULED
variable_amount	Provides information about the associated variable amount within the contract.	
variable_amount.id	Acts as a unique identifier for the specific variable amount.	variable_amount_TS05A0920230152a0F22105495
maximum_amount:	Indicates the maximum chargeable amount for this contract, with the example showcasing a maximum of 1.00 in the specified currency.	

This information helps merchants and payment gateway track the payment agreements and associated contracts with customers.

Customer Initiated Transactions

The "customer_initiated" boolean parameter distinguishes between customer-initiated and merchant-initiated transactions.

JSON
"customer_initiated":"false",


Here's how it works:

Transactions are considered customer-initiated by default, with the "customer_initiated" parameter set to true, involving the customer's active participation and 3D Secure (3DS) authentication for enhanced security.
If a transaction is merchant-initiated, "customer_initiated" is set to false, typically bypassing 3DS authentication. However, if a payment agreement is in place, the initial 3DS authorization serves as a reference for all subsequent transactions initiated by the merchant.
Depending on the "customer_initiated" status, certain rules apply. For instance, mada transactions in Saudi Arabia mandate a payment agreement ID (PA_ID) for all merchant-initiated transactions, reinforcing security protocols.
Tap Payments is progressively implementing clear distinctions between customer and merchant-initiated transactions across various card schemes, including VISA, MasterCard, and AMEX. From 2023 onwards, all new integrations are required to comply with this standard, while existing ones have until the end of 2023 to update their systems to continue using saved card features.
🚧

This phased approach mandates all merchants, both new and existing, to adapt to the "customer_initiated" parameter by the end of 2023 to ensure compliance and the ongoing ability to process saved card transactions.

📘

Post-migration, transactions processed without a payment agreement will be unsupported. The "customer_initiated" parameter will thus be instrumental in defining the transaction flow.

In essence, a false "customer_initiated" value signals a transaction initiated by the merchant without 3DS, and a true value indicates a transaction initiated by the customer with 3DS authentication.

Updated about 1 year ago

Payment Agreement and Contracts
Merchant Initiated Transaction
Did this page help you?
Yes
No
TABLE OF CONTENTS
Payment Agreement Object
Customer Initiated Transactions

URL: https://developers.tap.company/reference/customers

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Customers

This section will describe the Customer API overview, the request and response example.

Overview

Tap Payments' Customer API enables merchants to efficiently manage customer information for transactions. By passing a customer ID through the API, merchants can reuse the same customer details for future transactions. In the absence of a customer ID, Tap will create a new one.

📘

It is recommended to save the customer ID after a successful transaction so that future card details can be saved to the same customer ID.

To create a new customer in Tap Payments, it is mandatory to provide at least one of the following fields: first name, email, or first name + mobile number. This implies that while submitting customer information to Tap Payments, at least one of these fields must be included. The required customer information includes first name, middle name, last name, email, phone number, description, metadata, and currency.

Customer Request Example
{
	"first_name": "test23",
	"middle_name": "test",
	"last_name": "test",
	"email": "tes2t1234@test.com",
	"phone": {
		"country_code": "965",
		"number": "00000000"
	},
	"description": "test",
	"metadata": {
		"udf1": "test"
	},
	"currency": "KWD"
}

Customer Response Example
{
	"object": "customer",
	"live_mode": true,
	"created": "1681736385471",
	"merchant_id": "",
	"description": "test",
	"metadata": {
		"udf1": "test"
	},
	"currency": "KWD",
	"id": "cus_LV01H4520231259n9Y91704471",
	"first_name": "test23",
	"middle_name": "test",
	"last_name": "test",
	"email": "tes2t1234@test.com",
	"phone": {
		"country_code": "965",
		"number": "00000000"
	}
}


Updated almost 2 years ago

List All Merchants
Create a Customer
Did this page help you?
Yes
No
TABLE OF CONTENTS
Overview
Customer Request Example
Customer Response Example

URL: https://developers.tap.company/reference/delete-a-card

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
Retrieve a Card
GET
Verify a Card
POST
Delete a Card
DELETE
List All Cards
GET
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Delete a Card
DELETE
https://api.tap.company/v2/card/{customer_id}/{card_id}

This endpoint can be used to delete any saved cards.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
customer_id
string
required
Defaults to cus_TS030820221913o9P40906154

The ID of the customer whose card needs to be deleted.

card_id
string
required
Defaults to card_yQgS4922138M2ru9E05R787

The ID of the card that needs to be deleted.

RESPONSES
200

200

404

404

Updated about 1 year ago

Verify a Card
List All Cards
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request DELETE \
2
     --url https://api.tap.company/v2/card/cus_TS030820221913o9P40906154/card_yQgS4922138M2ru9E05R787 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
404 - Result

URL: https://developers.tap.company/reference/delete-a-customer

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Delete a Customer
DELETE
https://api.tap.company/v2/customers/{customer_id}

This endpoint deletes a customer permanently, and this action cannot be undone.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
customer_id
string
required

Unique identifier for the object.

RESPONSES
200

200

400

400

Updated 11 months ago

Update a Customer
List all Customers
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request DELETE \
2
     --url https://api.tap.company/v2/customers/customer_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/destinations

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Retrieve a Destination
GET
List All Destinations
POST
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Destinations
Overview

The "destinations" parameter can be used to transfer funds from one business to another within Tap. It allows the merchant to split a payment and send a portion of it to a different business, known as the destination business.

The Destination Request
JSON
{
  "display_name": "destplay",
  "business_id": "bus_Wntp1311012lnAh527153",
  "business_entity_id": "bsa_MxYZ1311012Viln527900",
  "brand_id": "brd_O4ZZ1311012Adr8527056",
  "branch_id": "brc_3Ud11311012OgEi527915",
  "bank_account": {
    "iban": "KWNBOKXXXXXXXXXXXXXXXXXXX"
  },
  "settlement_by": "Acquirer"
}

The Destination Response
JSON
{
  "id": "7691116100",
  "status": "Active",
  "created": 1573480740377,
  "object": "merchant",
  "live_mode": false,
  "api_version": "v2",
  "feature_version": "v2",
  "display_name": "mecplay",
  "business_id": "bus_jICJ50019921aGRG11Ja103291",
  "business_entity_id": "ent_QTFo56019921OSHN11Bv10y128",
  "brand_id": "brd_Uf1y59019921WrJI11h7107174",
  "branch_id": "brc_cemO2019922120F11jP10B63",
  "wallets": {
    "id": "wal_St480191659nfRg11aV108158",
    "status": "Active",
    "created": 1573480740158,
    "base_currency": "currency_YH3M1311012RFUc7214",
    "country": "country_as_QDVW13110125v1z7214",
    "settlement_by": "Acquirer",
    "primary_wallet": false
  },
  "bank_account": {
    "id": "bka_kKSB59191658lXvp11bY10h930",
    "status": "Active",
    "created": 1573480739930,
    "iban": "KWNBOKXXXXXXXXXXXXXXXXXXX"
  },
  "settlement_by": "Acquirer"
}


Updated 19 days ago

List All Businesses
Retrieve a Destination
Did this page help you?
Yes
No
TABLE OF CONTENTS
Overview
The Destination Request
The Destination Response

URL: https://developers.tap.company/docs/device-payments-integration-flow

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Device Payments

Integration Flow (Apple Pay)

Preparation

Please use CSR file provided by Tap for your Master Test Keys. Upload it to your Apple Pay developer account and provide the CER file back to us. Integrate the Apple Pay button to obtain the Apple Pay payload. Make sure to pass the correct country code for each country.

Save Apple Pay - with an Authorize Transaction
Request for "Create Token for Apple Pay" API to obtain the “Token ID”
Create an Authorize Request
Pass the “Token ID” in the Source.
Pass a small amount (1 SAR, 0.100 KWD, BHD)
Apply Auto Void after 1 hour - To auto void the amount
Pass 3DS as True - To Authenticate with 3DS
Pass Customer Initiated as True
Pass Save Card as True - To save the card after a successful card 3DS Authentication and Authorization.
Pass the Customer ID - Generated by the customer API in the customer object.
Pass the correct MID related to each country.
Pass the Redirect URL to redirect back after the 3DS Authentication
Pass the Post URL to pass the response after the 3DS Authentication
Save the following details from the Authorize Response for future transactions.
Authorize ID
Authorize Status
Card ID
Customer ID
Payment Agreement ID
Transactions - with a Save Apple Pay

Use the same Transaction flow for the Card and by using the Card ID that is linked with the Apple Pay DAN

Updated over 1 year ago

Redirect Payments
Authorize and Capture
Did this page help you?
Yes
No
TABLE OF CONTENTS
Preparation
Save Apple Pay - with an Authorize Transaction
Transactions - with a Save Apple Pay

URL: https://developers.tap.company/reference/download-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Download Authorize
POST
https://api.tap.company/v2/authorize/download

This endpoint allows you to retrieve a list of authorizes with detailed information. The response returned can be saved in a CSV file. Each row represents an authorization with its respective details, and the first row contains the headers describing each field.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
period
object

Retrieve charges for a selected period

PERIOD OBJECT
merchants
array of strings
Defaults to 599242

List of merchant IDs for which the charges are being queried

STRING
ADD STRING
status
string

Retrieve the selected list of charges info by charge status. Values can be: INITIATED, IN_PROGRESS, ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, CAPTURED, VOID, TIMEDOUT or UNKNOWN

sources
array of strings

Array of sources (you can specify the list of Source ID's to retrieve).

ADD STRING
payment_methods
array of strings

Array of payment methods (you can specify the list of payment method Source ID's to retrieve).

ADD STRING
customers
array of strings

Array of customers (you can specify the list of Customer ID's to retrieve).

ADD STRING
starting_after
string

A cursor for use in pagination. The starting_after parameter takes a charge ID that determines your position in the list. For example, if your list request returns 50 charges that end with cus_foo, you can use starting_after=cus_foo in your next call to retrieve the next page of the list.

charge_created
string

Created date (charge created date), Measured in Unix Epoch Timestamp (milliseconds).

mobile
string

Filter the results based on customer mobile number

email
string

filter the results based on customer email

limit
string

The maximum number of charges to return in a single call. Default: 25; Maximum: 50.

order
string

Sort the results Ascending or Descending by date

order_by
string

Defaults to date

metadata
object

Filter the results based on meta data values

METADATA OBJECT
currency
string

Filter the charges based on charge currency

reference
object
REFERENCE OBJECT
RESPONSES
200

200

400

400

Updated 3 months ago

List All Authorize
Charges
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/authorize/download \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: text/plain' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "period": {
9
    "date": {
10
      "from": 1662035009000,
11
      "to": 1664367809000
12
    }
13
  },
14
  "merchants": [
15
    "599242"
16
  ],
17
  "metadata": {
18
    "udf1": "test_data_1",
19
    "udf2": "test_data_2",
20
    "udf3": "test_data_3"
21
  },
22
  "reference": {
23
    "transaction": "txn_0001",
24
    "order": "ord_0001"
25
  }
26
}
27
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
text/plain
200 - Result
application/json
400 - Result

URL: https://developers.tap.company/reference/download-charges

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Create a Charge
POST
Retrieve a Charge
GET
Update a Charge
PUT
List all Charges
POST
Download Charges
POST
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Download Charges
POST
https://api.tap.company/v2/charges/download

This endpoint allows you to retrieve a list of charges with detailed information for each charge. The response returned can be saved in a CSV file. Each row represents a charge with its respective details, and the first row contains the headers describing each field.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
BODY PARAMS
period
object

Retrieve charges for a selected period

PERIOD OBJECT
merchants
array of strings
Defaults to 599242

List of merchant IDs for which the charges are being queried

STRING
ADD STRING
payouts
object

Retrieve charges based on payouts

PAYOUTS OBJECT
status
string

Retrieve the selected list of charges info by charge status. Values can be: INITIATED, IN_PROGRESS, ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, CAPTURED, VOID, TIMEDOUT or UNKNOWN

sources
array of strings

Array of sources (you can specify the list of Source ID's to retrieve).

ADD STRING
payment_methods
array of strings

Array of payment methods (you can specify the list of payment method Source ID's to retrieve).

ADD STRING
customers
array of strings

Array of customers (you can specify the list of Customer ID's to retrieve).

ADD STRING
charges
array of strings

Array of charges (you can specify the list of Source ID's to retrieve).

ADD STRING
starting_after
string

A cursor for use in pagination. The starting_after parameter takes a charge ID that determines your position in the list. For example, if your list request returns 50 charges that end with cus_foo, you can use starting_after=cus_foo in your next call to retrieve the next page of the list.

charge_created
string

Created date (charge created date), Measured in Unix Epoch Timestamp (milliseconds).

mobile
string

Filter the results based on customer mobile number

email
string

filter the results based on customer email

limit
string

The maximum number of charges to return in a single call. Default: 25; Maximum: 50.

order
string

Sort the results Ascending or Descending by date

order_by
string

Defaults to date

metadata
object

Filter the results based on meta data values

METADATA OBJECT
currency
string

Filter the charges based on charge currency

reference
object
REFERENCE OBJECT
RESPONSES
200

200

400

400

Updated 6 months ago

List all Charges
Refund
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/charges/download \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: text/plain' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "period": {
9
    "date": {
10
      "from": "1662190768000",
11
      "to": "1662536368000"
12
    },
13
    "type": "1"
14
  },
15
  "merchants": [
16
    "599242"
17
  ],
18
  "metadata": {
19
    "udf1": "Metadata 1"
20
  },
21
  "reference": {
22
    "transaction": "txn_01",
23
    "order": "ord_01"
24
  }
25
}
26
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
text/plain
200 - Result
application/json
400 - Result

URL: https://developers.tap.company/reference/download-refunds

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
Create a Refund
POST
Retrieve a Refund
GET
Update a Refund
PUT
List All Refunds
POST
Download Refunds
POST
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Download Refunds
POST
https://api.tap.company/v2/refunds/download

This endpoint allows you to retrieve a list of refunds with detailed information for each refund. The response returned can be saved in a CSV file. Each row represents a refund with its respective details, and the first row contains the headers describing each field.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
period
object

Retrieve charges for a selected period

PERIOD OBJECT
merchants
array of strings
Defaults to 599242

List of merchant IDs for which the charges are being queried

STRING
ADD STRING
status
string

Retrieve the selected list of charges info by charge status. Values can be: INITIATED, IN_PROGRESS, ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, CAPTURED, VOID, TIMEDOUT or UNKNOWN

sources
array of strings

Array of sources (you can specify the list of Source ID's to retrieve).

ADD STRING
payment_methods
array of strings

Array of payment methods (you can specify the list of payment method Source ID's to retrieve).

ADD STRING
customers
array of strings

Array of customers (you can specify the list of Customer ID's to retrieve).

ADD STRING
charges
array of strings

Array of charges (you can specify the list of Source ID's to retrieve).

ADD STRING
starting_after
string

A cursor for use in pagination. The starting_after parameter takes a charge ID that determines your position in the list. For example, if your list request returns 50 charges that end with cus_foo, you can use starting_after=cus_foo in your next call to retrieve the next page of the list.

charge_created
string

Created date (charge created date), Measured in Unix Epoch Timestamp (milliseconds).

mobile
string

Filter the results based on customer mobile number

email
string

filter the results based on customer email

limit
string

The maximum number of charges to return in a single call. Default: 25; Maximum: 50.

order
string

Sort the results Ascending or Descending by date

order_by
string

Defaults to date

metadata
object

Filter the results based on meta data values

METADATA OBJECT
currency
string

Filter the charges based on charge currency

reference
object
REFERENCE OBJECT
RESPONSES
200

200

400

400

Updated 3 months ago

List All Refunds
Tokens
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/refunds/download \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: text/plain' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "merchants": [
9
    "599242"
10
  ],
11
  "metadata": {
12
    "key": "value"
13
  },
14
  "reference": {
15
    "merchant": "1234"
16
  }
17
}
18
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
text/plain
200 - Result
application/json
400 - Result

URL: https://developers.tap.company/reference/finalize-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Finalize an Invoice
POST
https://api.tap.company/v2/invoices/{invoice_id}/finalize
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
invoice_id
string
required

[required]

RESPONSES
200

200

400

400

Updated almost 2 years ago

Remind an Invoice
List all Invoices
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request POST \
2
     --url https://api.tap.company/v2/invoices/invoice_id/finalize \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/benefitpay-sdk-flutter

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Web
iOS
Android
React-Native
Flutter
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Flutter

Integrating Flutter BenefitPay SDK in your application

Introduction

Welcome to the Benefit Pay SDK! Before starting the development process, it's important to establish the essential prerequisites and criteria for a seamless integration. In this guide, we’ll cover the specific requirements for iOS and Android, including the minimum SDK versions and other key considerations. Let’s set your project up for success right from the start!

Sample Demo




📘

BenefitPay SDK allows users to make payments in two ways:

Scanning a QR code to initiate the payment
Directly using the BenefitPay App to make the payment
Step 1: Requirements
We support from iOS 13.0+
Dart 3.0.0+
Java version 11
A minimum Android SDK/API level of 24
in order to accept online payments on your application, you will need to add at least the Internet permission in the manifest file.
Dart
xml <uses-permission android:name="android.permission.INTERNET" /> //get internet access to complete online payments

Step 2: Get Your Public Keys

While you can certainly use the sandbox keys available within our sample app which you can get by following the installation process. However, we highly recommend visiting our onboarding page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating Card-Flutter integration. If you will support both iOS and Android, you will need to have two different keys for each app.

Step 3: Installation

In thepubspec.yamlof your flutter project, add the following dependency:

benefit_pay_flutter: ^1.0.0

To download the example code from GitHub

Step 4: Integrating BenefitPay-Flutter
Integration Flow

Note that in Flutter, you will use our button like any other widget. While creating, the widget you will also need to pass the parameters & listen to the callbacks based on your needs.

You will have to create a variable of type TapBenefitPayWidget
While initializing the widget:
Pass the parameters to the widget.
Implement the provided interfaces/callbacks
Our button widget is a stateful one and depends on a stateful variable to listen to all callbacks.
Using Code to create the TapBenefitPayWidget
Creating the TapBenefitPayWidget from code
Head to your controller where you want to display the TapBenefitPayWidget as a widget.
ImportTapBenefitPayWidgetas follows
import 'package:benefit_pay_flutter/benefit_pay_flutter.dart';.
In the coming code sample, we will show how to embed the button form within your widget tree.
Dart
TapBenefitPayWidget(    
   sdkConfiguration: const {},  
 ),   



Configuring the BenefitPay-Flutter SDK

While creating the widget as previously mentioned, it is time to pass the parameters needed for the SDK to work as expected and serve your needs correctly.

Pass these parameters to the TapBenefitPayWidget widget
Dart
sdkConfiguration: const {

  "merchant": {
    "id": "",
  },
  "scope": "charge",
  "redirect": "",
  "customer": {
    "names": [
      {
        "middle": "Middle",
        "last": "Payments",
        "lang": "en",
        "first": "Tap"
      }
    ],
    "contact": {
      "phone": {
        "number": "66178990",
        "countryCode": "965"
      },
      "email": "email@email.com"
    },
    "id":"",
  },
  "locale": "en",
  "edges": "curved",
  "reference": {"transaction": "transaction", "order": "12"},
  "metadata": "",
  "post": {"url": ""},
  "transaction": {
    "amount": "10",
    "currency": "BHD",
  },
  "operator": {
    "hashString": "",
    "publicKey": 'pk_live_********',
  },

}


Full code snippet for creating the parameters + passing it TapBenefitPayWidget variable + Listening to callbacks

Dart
 import 'package:benefit_pay_flutter/benefit_pay_flutter.dart'; import 'package:flutter/material.dart';      
 class BenefitPayScreen extends StatefulWidget {      
  final Map<String, dynamic> dictionaryMap;      
      
  const BenefitPayScreen({      
    super.key,      
    required this.dictionaryMap,      
  });      
      
@override State<BenefitPayScreen> createState() => _BenefitPayScreenState(); }      
 class _BenefitPayScreenState extends State<BenefitPayScreen> {      
  String sdkResponse = "";      
      
  @override      
  Widget build(BuildContext context) {      
    return Scaffold(      
      backgroundColor: Colors.white,      
      appBar: AppBar(      
        title: const Text('Plugin example app'),      
      ),      
      body: Padding(      
        padding: const EdgeInsets.symmetric(      
          horizontal: 18,      
          vertical: 50,      
        ),      
        child: SingleChildScrollView(      
          child: Center(      
            child: SelectableText(      
              sdkResponse.isEmpty ? " " : "SDK RESPONSE : $sdkResponse",      
            ),      
          ),      
        ),      
      ),      
      bottomSheet: Padding(      
        padding: const EdgeInsets.only(bottom: 20),      
        child: TapBenefitPayWidget(      
          sdkConfiguration: widget.dictionaryMap,      
          onReady: () {      
            developer.log(">ON READY >>>>");      
          },      
          onCancel: () {      
            developer.log(">ON CANCEL >>>>");      
            setState(() {      
              sdkResponse = "Cancelled";      
            });      
          },      
          onSuccess: (String? value) {      
            developer.log(">ON SUCCESS >>>> $value");      
            setState(() {      
              sdkResponse = value ?? "";      
            });      
          },      
          onError: (String? error) {      
            developer.log(">ON ERROR >>>> $error");      
            setState(() {      
              sdkResponse = error ?? "";      
            });      
          },      
          onClick: () {      
      
          },      
          onOrderCreated: (String? value) {      
            developer.log(">ON ORDER CREATED >>>> $value");      
            setState(() {      
              sdkResponse = value ?? "";      
            });      
          },      
          onChargeCreated: (String? value) {      
            developer.log(">ON CHARGE CREATED >>>> $value");      
            setState(() {      
              sdkResponse = value ?? "";      
            });      
          },      
        ),      
      ),      
    ); 
   }
 }   


Parameters Reference

Below you will find more details about each parameter shared in the above tables that will help you easily integrate BenefitPay-Flutter SDK.

Parameter	Description	Required	Type	Fields	Sample
operator	It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...	True	string	publicKey
Definition:This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.
hashString
Definition: It is an encrypted string that combines the sensitive details of your transaction to mitigate any fraud manipulations..	"operator": { "publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": "" },
transaction	This defined the details of the order that you are trying to purchase, in which you need to specify some details like the reference, scope...	True	Dictionary	currency
Definition: The currency which is linked to the order being paid.
amount
Definition: The order amount to be paid by the customer.
Note: Minimum amount to be added is 0.1.	"transaction": { "amount": 1.0, "currency": "BHD", }
customer	Here, you will collect the information of the customer that is paying..	True	Dictionary	id
Definition: This is an optional field that you do not have before the charge is processed. But, after the charge, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.
name
Definition: Full Name of the customer paying.
Fields:

1. lang
Definition: Language chosen to write the customer name.

2. first
Definition: Customer's first name.

3. middle
Definition: Customer's middle name.

4. last
Definition: Customer's last name.
contact
Definition: The customer's contact information like email address and phone number.
Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.
Fields:

5. email
Definition: Customer's email address
Note: The email is of type string.

6. phone
Definition: Customer's Phone number details
a. countryCode
b. number	"id": customerIdController.text, "names": const [ { "first": "TAP", "middle": "", "last": "PAYMENTS", "lang": "en", } ], "contact": const { "email": "[tap@tap.company](mailto:tap@tap.company) ", "phone": { "countryCode": "+965", "number": "88888888" } }, }, }
interface	This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...	False	Dictionary	locale
Definition: The language of the pay button. Accepted values as of now are:
Possible Values:

- en(for english)

- ar(for arabic).edges
Definition: Control the edges of the payment form.
Possible Values:

- curved

- flat	"interface": { "locale": "en", "edges": "flat", }
post	Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.	True	Dictionary	url
Definition: The webhook server's URL that you want to receive notifications on.	"post": const {"url": "http\://your_website.com/post_url"},
Generate the hash string
Add the dependency crypto: Latest version
Copy this helper method code
This is a helper method showing how can you generate a hash string when performing live charges
Parameter publicKey: The Tap public key for you as a merchant pk_.....
Parameter secretKey: The Tap secret key for you as a merchant sk_.....
Parameter amount: The amount you are passing to the SDK, to the amount you used in the order if you created the order before.
Parameter currency:The currency code you are passing to the SDK, to the currency code you used in the order if you created the order before. PS: It is the capital case of the 3 iso country codes ex: SAR, KWD.
Parameter post: The post URL you are passing to the SDK, to the post url you pass within the Charge API.
If you are not using postUrl please pass it as an empty string
Parameter transactionReference: The reference.trasnsaction you are passing to the SDK(not all SDKs supports this,) or the reference.trasnsaction you pass within the Charge API.
If you are not using reference.trasnsaction please pass it as an empty string.
🚧

For the production environment, it is required to provide the hashsting parameter, as it is a necessary component for the functionality to work correctly.

Conversely, in the sandbox environment, the hashsting parameter is not required.

Dart
  String generateTapHashString(           
        String publicKey,    
        String secretKey,
        double amount,        
        String currency, {        
        String postUrl = "",        
        String transactionReference = "",        
     }) {        
       // Let us generate our encryption key        
       var key = utf8.encode(secretKey);        
       // For amounts, you will need to make sure they are formatted in a way to have     the correct number of decimal points. For BHD we need them to have 3 decimal points        
       var formattedAmount = amount.toStringAsFixed(3);        
       // Let us format the string that we will hash        
       var toBeHashed = 'x_publickey$publicKey'        
       'x_amount$formattedAmount'        
       'x_currency$currency'        
       'x_transaction$transactionReference'        
       'x_post$postUrl';        
       // let us generate the hash string now using the HMAC SHA256 algorithm        
       var hmacSha256 = Hmac(sha256, key);        
       var signature = hmacSha256.convert(utf8.encode(toBeHashed));        
       var hashedString = signature.toString();        
       return hashedString; 
}


Next, you should call it as shown below:


dart
 String hashString = generateTapHashString(publicKey: publicKey, secretKey: secretString, amount: amount, currency: currency, postUrl: postUrl,transactionReference:transactionReference);

Finally, you need to Pass it within the operator model as shown below:


dart
  { "operator": {"publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": hashString } }   


Reaching this point, you will be successfully integrated our benefitpay-sdk into your flutter application

Updated about 1 month ago

React-Native
Apple Pay
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Sample Demo
Step 1: Requirements
Step 2: Get Your Public Keys
Step 3: Installation
Step 4: Integrating BenefitPay-Flutter
Integration Flow
Parameters Reference
Generate the hash string

URL: https://developers.tap.company/reference/getting-started-with-your-api-7

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Getting Started With Your API

This page will help you get started with BIN.

This is where you show your users how to set it up. You can use code samples, like this:

JavaScript
$http.post('/someUrl', data).success(successCallback);

alert('test');


Try typing / to see how easy it is to add more content!

Updated 15 days ago

Charges Response Codes
Download Disputes
Did this page help you?
Yes
No

URL: https://developers.tap.company/docs/marketplace-getting-started

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Getting Started
Before you begin
Contact Tap team to confirm if you are eligible to use Tap’s Marketplace solution.
Follow our Get started guide to set up your test account and get your API keys.
When confirmed that Tap’s Marketplace solution is a good fit for your use case, we will provide you with Marketplace keys to be used for onboarding.
📘

You will receive two sets of keys:

Marketplace Keys: to be used for onboarding Businesses.
Merchant Keys: to be used for payment processing.




Step 1: Onboarding Businesses

Each Business has to be onboarded on Tap. An account will be created, and Tap will carry out the KYC verification process before the final account approval.

Onboarding your Businesses requires two steps:

Uploading the Business KYC documents.
Creating a destination_id for the Business using Business API.




Step 2: Accepting payments

Once Business have been onboarded, you can instantly start accepting payments for the newly created Business.

👍

You can accept payments for your Businesses immediately after onboarding, but payouts will not be available while the Business's account is pending approval.
It is recommended to wait until the KYC process is completed, and the account is approved by Tap.

You can split the payment's amount between multiple Businesses, simply by adding the destinations object in the transaction request. For example, when a payment is done on your Marketplace, you can split the amount so that a portion goes to your Marketplace account as a fee or commission, and the remaining of the payment amount goes to the Business's account.

JSON
"destinations": {
    "destination": [
      {
        "id": "480593",
        "amount": 2,
        "currency": "KWD"
      },
      {
        "id": "486374",
        "amount": 3,
        "currency": "KWD"
      }
    ]
  }







Step 3: Payouts

After a Business account successfully passes required KYC checks, payouts will be available. Payouts can be initiated automatically by Tap to the Business's bank account, or you can initiate manually from Tap's dashboard.

📘

If you want to initiate the payouts manually, contact our team to disable the auto settlement for the Business's account. Once disabled, you'll have the option to initiate the payout from the dashboard.




Step 4: Reconciliation




See also
Onboarding Businesses

Onboard your Businesses

Split Payments

Split the amount at the time of the transaction

After Payments

Updated 3 days ago

Overview
Onboarding Businesses
Did this page help you?
Yes
No
TABLE OF CONTENTS
Before you begin
Step 1: Onboarding Businesses
Step 2: Accepting payments
Step 3: Payouts
Step 4: Reconciliation
See also

URL: https://developers.tap.company/docs/google-pay

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Cards
Google Pay
OmanNet
Benefit
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Google Pay

Google Pay is a digital wallet platform and online payment system that allows users to store their credit and debit cards, and other payment methods in the app to make purchases online and in stores.

Google Pay should be enabled from the tap side before using it on the Merchant side.

It's currently supported in UAE, KSA, and KW, with currencies AED, SAR, and KWD, respectively, and USD is an addition.
"We keep adding more countries and currencies. For more updates, please keep in touch with TAP support teams"

Integration with Google Pay

Google Pay integration depends on the UI mode chosen by the merchant.

Web-based [redirect/popup]

It doesn't require any configuration from the merchant's side. The Google Pay option will appear on our hosted payment page or popup window automatically. Customers can choose and make a payment.

Web-based [iframe]

Tap iFrame/embedded form does not support the Google Pay option. So, merchants can add a separate button for Google Pay on the checkout page for the customers' choice.

The button can be integrated with the backend APIs, as explained below

Google Pay Integration Google References

When you follow google example in the link above you will find an object named tokenizationSpecification and inside that object you will find another object called parameters you have to pass the keyword tappayments in the gateway and your MID with tap inside gatewayMerchantId like below

google pay
const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "tappayments",
        gatewayMerchantId: "your MID",
      },
    };


After you send the request you will get the token data in the response under paymentData.paymentMethodData.tokenizationData.token as per the example in google pay documentation.



Mobile-based

You can follow our documentation on github for Google Pay integration with full details.

API Call for tokenizing the data that comes from the google pay callback function, as below:

API request

Sample request

cURL
curl --location --request POST 'https://api.tap.company/v2/tokens' \
--header 'Authorization: Bearer sk_test_jrJQTIMVt9oY0FNyEbCguXXX' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "googlepay",
    "token_data": {
        "signature": "MEUCIQCgAIHrd65KhLQR4KMDqwfSYyjdF/rKUQG7eVPAP2NIuAIgWcA02MjvXAD9Xo4u2O6gl6PBjNNJeLTNy++paOGE3nE=",
        "intermediateSigningKey": {
            "signedKey": "{\"keyValue\":\"/uCLf1SqYc4feUicYPJSIu1djT3RQXe/71W50TegMLcs94OScACGtOPaiJmZwUPxCA\\u003d\\u003d\",\"keyExpiration\":\"1663134862361\"}",
            "signatures": [
                "MEYCIQDf7b5O3xatEfZu9aK1+IebTs1N2otF++MtdgwitZK6iUf2hNdb4XXut+k5H8tHj"
            ]
        },
        "protocolVersion": "ECv2",
        "signedMessage": "{\"encryptedMessage\":\"8tW8iQuL8dOyZ1+OhZMMzVXFggBsE2dKobOsNw00nOQI7JuY7Zfqq4kbae+o48HoXDayEHkjFlnXW/QZBIHBqWgrMce9LJj+jnYTN7WcAAxLNbwf3leZs+zV7GMV+0aMAsOOdvKdurCg7LBIDJZeNbMyomtp9HqQ+paLjgxqtvOGnZ5jJoYMTQqOR+qdFmxvsOqhHZHtiRvdTQi8Z9p9+jvbn28M0DRle1COyQOrhnOVZ7RUu1kYaMm7cOxeXbXP4CuuCb2EQZ\",\"ephemeralPublicKey\":\"BPYdAC923D/jRypCseOUA9bersY0i\\u003d\",\"tag\":\"UcPrx3j4NzXy38/pKZ4nXEViVSKacXEQpxeRxqdkZPU\\u003d\"}"
    },
    "client_ip": "192.168.1.20"
}'

API Response

A token_id is expected in the API response, and it also contains the card information.

JSON

{
   "id": "tok_zMMQ40227330XHU6SXXXXX",
   "created": 1662449620276,
   "object": "token",
   "live_mode": false,
   "type": "GOOGLEPAY",
   "used": false,
   "card": {
       "id": "card_3snF4022733eqh56yL8E279",
       "object": "card",
       "funding": "CREDIT",
       "fingerprint": "FEAWi7M8%2BpIXbsraeWsHfuMOg2AeIpG5Pp2wkf4LHPU%3D",
       "brand": "VISA",
       "scheme": "VISA",
       "exp_month": 12,
       "exp_year": 2027,
       "last_four": "3478",
       "first_six": "489537"
   }
}

   "type": "googlepay"

}

Charge the Token

Sample to control the source object in the charge API: with "token_id"

JSON
{
...
	"source": {
		"id": "tok_zMMQ40227330XHU6SXXXXX"
    }
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd"
     },
 "redirect": {
    "url": "https://customer.redirection_url"
     }
...
}


If 3Ds card, the API response would be INITIATED, and then it processes the further authentication.

If a Non-3Ds card is used in the google pay token, payment will be directly CAPTURED in the API response (Not Initiated).

Updated 3 months ago

Cards
OmanNet
Did this page help you?
Yes
No
TABLE OF CONTENTS
Integration with Google Pay
Web-based redirect/popup
Web-based iframe
Mobile-based

URL: https://developers.tap.company/docs/benefitpay-sdk-ios

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Web
iOS
Android
React-Native
Flutter
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
iOS

Integrating iOS BenefitPay SDK in your application

Introduction

Before diving into the development process, it's essential to establish the prerequisites and criteria necessary for a successful build. In this step, we'll outline the specific iOS requirements, including the minimum SDK version and other important details you need to consider. Let's ensure your project is set up for success from the very beginning.

Sample Demo
Step 1: Requirements
We support from iOS 13.0+
Swift Version 5.0+
Objective-C
Step 2: Get Your Public Keys

While you can certainly use the sandbox keys available within our sample app which you can get by following the installation process, however, we highly recommend visiting our onboarding page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating BenefitPay-iOS integration.

Step 3: Installation
Swift Package Manager
Open your project's settings.
Navigate to Package Dependencies
Add a new package
Paste BenefitPay-iOS package url : https://github.com/Tap-Payments/BenefitPay-iOS.git
Add to the target.
CocoaPods
Add this to your pod file
pod BenefitPay-iOS
Run this in terminal
Swift
pod install
pod update

Step 4: Integrating BenefitPay-iOS

This integration offers two distinct options: a simple integration designed for rapid development and streamlined merchant requirements, and an advanced integration that adds extra features for a more dynamic payment integration experience.

Integration Flow

your storyboard then implement the functionality through code or fully create it by code. Below we will describe both flows:

You will have to create a variable of type BenefitPayButton, which can be done in one of two ways:
Created in the storyboard and then linked to a variable in code.
Created totally within the code.
Once you create the variable in any way, you will have to follow these steps:
Create the parameters.
Pass the parameters to the variable.
Implement BenefitPayButtonDelegate protocol, which allows you to get notified by different events fired from within the BenefitPay-iOS SDK, also called callback functions.
Initialising the UI
📘

Note: You can initialise the BenefitPay-iOS SDK either using Storyboard for the UIView then implementing the functionality through code or directly create everything through Code as provided below.

Using Storyboard
Creating the BenefitPayButton in storyboard
Drag and drop a UIView inside the UIViewController you want in the Storyboard.
Declare as of type BenefitPayButton
Make an IBOutlet to the UIViewController.
Accessing the BenefitPayButton created in storyboard in your code 3. Create an IBOutlet from the created view above to your UIViewController
Swift
 /// The outlet from the created view above
@IBOutlet weak var benefitPayButton: BenefitPayButton!

Using Code to create the BenefitPayButton
Creating the BenefitPayButton from code
Head to your UIViewController where you want to display the BenefitPayButton as a subview.
Import BenefitPay-iOS as follows import BenefitPay_iOS at the top of your UIViewController.
Create a class variable var benefitPayButton:BenefitPayButton = .init() /// An instance of the benefit pay button
In the coming code sample, we will show how to create the view and how to set its layout constraints to take full width as recommended.
Swift
.
.
.
// Add it as a subview
view.addSubview(benefitPayButton)
// Make it adjusts to constraints at run time
benefitPayButton.translatesAutoresizingMaskIntoConstraints = **false**
// Set the constraints as recommended by us to have full width + leading & trailing paddings.
// Let us center vertically for demo purposes
// Height is to be set to 48
NSLayoutConstraint.activate([
benefitPayButton.leadingAnchor.constraint(equalTo: **self**.view.leadingAnchor, constant: 10),
benefitPayButton.trailingAnchor.constraint(equalTo: **self**.view.trailingAnchor, constant: -10),
benefitPayButton.centerYAnchor.constraint(equalTo: **self**.view.centerYAnchor)])
.
.

Step 5: Choose your Integration
Simple Integration

Here, you'll discover a comprehensive table featuring the parameters applicable to the simple integration. Additionally, you'll explore the various methods for integrating the SDK, either using storyboard to create the layout and then implementing the controllers functionalities by code, or directly using code. Furthermore, you'll gain insights into how to receive the callback notifications.

Parameters

Each parameter is linked to the reference section, which provides a more in depth explanation of it.

Parameter	Description	Required	Type	Sample
operator	It has the key obtained after registering your package name, also known as Public key. Also, the hashString value which is used to validate live charges.	True	Dictionary	let operator:[String:Any]\: ["publicKey":"pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7", "hashString":""]
order	Order details linked to the charfe.	True	Dictionary	let order:[String:String] = \["id":"", "amount":1, "currency":"SAR", "description": " description","reference":"","metadata":[:]]
customer	Customer details for charge process.	True	Dictionary	let customer = \["id":"","name":\[["lang":"en","first":"TAP","middle":"","last":"PAYMENTS"]], "contact":\["email":"[tap@tap.company](mailto:tap@tap.company)", "phone":["countryCode":"+965","number":"88888888"]]]
Configuring the BenefitPay-iOS SDK

After creating the UI using any of the previously mentioned ways, it is time to pass the parameters needed for the SDK to work as expected and serve your need correctly.

Creating the parameters

To allow flexibility and to ease the integration, your application will only has to pass the parameters as a Dictionary[String:Any] .
First, let us create the required parameters:

Swift
/// The minimum needed configuration dictionary
    let parameters: [String: Any] =
      [
      "operator": ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": ""],
      "order": [
        "id": "",
        "amount": 0.1,
        "currency": "BHD",
        "description": "description",
        "reference": ""
      ],
      "customer": [
        "id": "",
        "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
        "contact": [
          "email": "tap@tap.company",
          "phone": ["countryCode": "+965", "number": "88888888"],
        ],
      ],
    ]

Pass these parameters to the created Button variable before as follows
Swift
// We provide the button view the needed parameters and we assign ourselves optionally to be the delegate, where we can listen to callbacks.
benefitPayButton.initBenefitPayButton(configDict: parameters, delegate: self)


Full code snippet for creating the parameters + passing it BenefitPayButton variable

Swift
import BenefitPay_iOS
import UIKit

class ViewController: UIViewController {

  /// Create a class variable to hold your benefit pay button
  var benefitPayButton: BenefitPayButton = .init()
  /// The minimum needed configuration dictionary
  let parameters: [String: Any] =
    [
      "operator": ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": ""],
      "order": [
        "id": "",
        "amount": 0.1,
        "currency": "BHD",
        "description": "description",
        "reference": "",
      ],
      "customer": [
        "id": "",
        "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
        "contact": [
          "email": "tap@tap.company",
          "phone": ["countryCode": "+965", "number": "88888888"],
        ],
      ],
    ]

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    // Add it as a subview
    view.addSubview(benefitPayButton)
    // Make it adjusts to constraints at run time
    benefitPayButton.translatesAutoresizingMaskIntoConstraints = false
    // Set the constraints as recommended by us to have full width + leading & trailing paddings.
    // Let us center vertically for demo purposes
    // Height is to be set to 48
    NSLayoutConstraint.activate([
      benefitPayButton.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 10),
      benefitPayButton.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: -10),
      benefitPayButton.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
    ])

    // let us configure the button
    benefitPayButton.initBenefitPayButton(configDict: parameters, delegate: self)

  }

}

extension ViewController: BenefitPayButtonDelegate {

}


Receiving Callback Notifications
Now we have created the UI and the parameters required to to correctly display BenefitPayButton form. For the best experience, your class will have to implement BenefitPayButtonDelegate protocol, which is a set of optional callbacks, that will be fired based on different events from within the benefit button. This will help you in deciding the logic you need to do upon receiving each event. Kindly follow the below steps in order to complete the mentioned flow:

Go back to UIViewController/UiView file you want to get the callbacks into.
Head to the class declaration line
Add BenefitPayButtonDelegate
Override the required callbacks as follows:
Swift
  ///  Will be fired whenever there is an error related to the button connectivity or apis
  ///  - Parameter  data: includes a JSON format for the error description and error
  func onError(data: String) {
	print("\n\n========\n\nonError \(data))")
  }
	///  Will be fired whenever the charge is completed, regardless of its status.
	///  - Parameter  data: includes a JSON format for the charge details
  func onSuccess(data: String) {
	print("\n\n========\n\nonSuccess \(data))")
  }
  ///  Will be fired whenever the benefit pay button is rendered and loaded
  func onReady() {
    print("\n\n========\n\nonReady")
  }


Full code snippet for creating the parameters + passing it BenefitPayButton variable + Listening to callbacks

Swift
//
//  ViewController.swift
//  BenefitPayDemo
//
//  Created by Osama Rabie on 19/10/2023.
//

import BenefitPay_iOS
import UIKit

class ViewController: UIViewController {

  /// Create a class variable to hold your benefit pay button
  var benefitPayButton: BenefitPayButton = .init()
  /// The minimum needed configuration dictionary
  let parameters: [String: Any] =
    [
      "operator": ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": ""],
      "order": [
        "id": "",
        "amount": 0.1,
        "currency": "BHD",
        "description": "description",
        "reference": "",
      ],
      "customer": [
        "id": "",
        "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
        "contact": [
          "email": "tap@tap.company",
          "phone": ["countryCode": "+965", "number": "88888888"],
        ],
      ],
    ]

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    // Add it as a subview
    view.addSubview(benefitPayButton)
    // Make it adjusts to constraints at run time
    benefitPayButton.translatesAutoresizingMaskIntoConstraints = false
    // Set the constraints as recommended by us to have full width + leading & trailing paddings.
    // Let us center vertically for demo purposes
    // Height is to be set to 48
    NSLayoutConstraint.activate([
      benefitPayButton.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 10),
      benefitPayButton.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: -10),
      benefitPayButton.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
    ])

    // let us configure the button
    benefitPayButton.initBenefitPayButton(configDict: parameters, delegate: self)

  }

}

extension ViewController: BenefitPayButtonDelegate {
  func onError(data: String) {
    print("\n\n========\n\nonError \(data))")
  }

  func onSuccess(data: String) {
    print("\n\n========\n\nonSuccess \(data))")
  }
  
  func onReady() {
    print("\n\n========\n\nonReady")
  }
}

Advanced Integration

The advanced configuration for the BenefitPay-iOS integration not only has all the features available in the simple integration but also introduces new capabilities, providing merchants with maximum flexibility. You can find a code below, where you'll discover comprehensive guidance on implementing the advanced flow as well as a complete description of each parameter.

Parameters

Each parameter is linked to the reference section, which provides a more in depth explanation of it.

Parameter	Description	Required	Type	Sample
operator	It has the key obtained after registering your package name, also known as Public key. Also, the hashString value which is used to validate live charges.	True	Dictionary	let operator:[String:Any]\: ["publicKey":"pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7", "hashString":""]
Order	Order details linked to the charfe.	True	Dictionary	let order:[String:String] = \["id":"", "amount":1, "currency":"SAR", "description": " description","reference":"","metadata":[:]]
customer	Customer details for charge process.	True	Dictionary	let customer = \["id":"","name":\[["lang":"en","first":"TAP","middle":"","last":"PAYMENTS"]], "contact":\["email":"[tap@tap.company](mailto:tap@tap.company)", "phone":["countryCode":"+965","number":"88888888"]]]
interface	Look and feel related configurations (optional).	False	Dictionary	let interface:[String:String] = ["locale": "en", "theme": "light", "edges": "curved", "colorStyle": "colored", "loader": true]
post	Webhook for server-to-server updates (optional).	False	Dictionary	let post:[String:String] = ["url":""]
Initialisation of the input

You can use a Dictionary to send data to our SDK. The benefit is that you can generate this data from one of your APIs. If we make updates to the configurations, you can update your API, avoiding the need to update your app on the App Store.

Swift
  /// The   configuration dictionary
  let parameters: [String: Any] =  [
      "operator": ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": ""],
      "order": [
        "id": "",
        "amount": 0.1,
        "currency": "BHD",
        "description": "description",
        "reference": "",
        "metadata": [:],
      ],
      "invoice": ["id": ""],
      "merchant": ["id": ""],
      "customer": [
        "id": "",
        "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
        "contact": [
          "email": "tap@tap.company",
          "phone": ["countryCode": "+965", "number": "88888888"],
        ],
      ],
      "interface": [
        "locale": "en",
        "theme":"light",
        "edges": "curved",
        "colorStyle": "colored",
        "loader": true,
      ],
      "post": ["url": ""],
    ]


Receiving Callback Notifications (Advanced Version)

The below will allow the integrators to get notified from events fired from the BenefitPayButton.

Swift
  ///  Will be fired whenever there is an error related to the button connectivity or apis
  ///  - Parameter  data: includes a JSON format for the error description and error
  func onError(data: String) {
	print("\n\n========\n\nonError \(data))")
  }
	///  Will be fired whenever the charge is completed, regardless of its status.
	///  - Parameter  data: includes a JSON format for the charge details
  func onSuccess(data: String) {
	print("\n\n========\n\nonSuccess \(data))")
  }

	///  Will be fired whenever the order is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: Order id.
  func onOrderCreated(data: String) {
	print("\n\n========\n\nonOrderCreated \(data))")
  }
	///  Will be fired whenever the charge is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: json data representing the charge model.

  func onChargeCreated(data: String) {
	print("\n\n========\n\nonChargeCreated \(data))")
  }
  ///  Will be fired whenever the benefit pay button is rendered and loaded
  func onReady() {
    print("\n\n========\n\nonReady")
  }
  ///  Will be fired whenever the customer clicked on the benefit pay button. Now the button will be in loading state to render the benefit pay popup
  func onClicked() {
    print("\n\n========\n\nonClicked")
  }
  
  ///  Will be fired whenever the customer cancels the payment. This will reload the button once again
  func onCanceled() {
    print("\n\n========\n\nonCanceled")
  }

Full Code Sample

Once all of the above steps are successfully completed, your UIViewController file should look like this:

Swift
import BenefitPay_iOS
import UIKit

class ViewController: UIViewController {

  /// Create a class variable to hold your benefit pay button
  var benefitPayButton: BenefitPayButton = .init()
  /// The minimum needed configuration dictionary
  let parameters: [String: Any] =
    [
      "operator": ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": ""],
      "order": [
        "id": "",
        "amount": 0.1,
        "currency": "BHD",
        "description": "description",
        "reference": "",
        "metadata": [:],
      ],
      "invoice": ["id": ""],
      "merchant": ["id": ""],
      "customer": [
        "id": "",
        "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
        "contact": [
          "email": "tap@tap.company",
          "phone": ["countryCode": "+965", "number": "88888888"],
        ],
      ],
      "interface": [
        "locale": "en",
        "theme": UIView().traitCollection.userInterfaceStyle == .dark ? "dark" : "light",
        "edges": "curved",
        "colorStyle": UIView().traitCollection.userInterfaceStyle == .dark
          ? "monochrome" : "colored",
        "loader": true,
      ],
      "post": ["url": ""],
    ]

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    // Add it as a subview
    view.addSubview(benefitPayButton)
    // Make it adjusts to constraints at run time
    benefitPayButton.translatesAutoresizingMaskIntoConstraints = false
    // Set the constraints as recommended by us to have full width + leading & trailing paddings.
    // Let us center vertically for demo purposes
    // Height is to be set to 48
    NSLayoutConstraint.activate([
      benefitPayButton.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 10),
      benefitPayButton.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: -10),
      benefitPayButton.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
    ])

    // let us configure the button
    benefitPayButton.initBenefitPayButton(configDict: parameters, delegate: self)

  }

}

extension ViewController: BenefitPayButtonDelegate {
  func onError(data: String) {
    print("\n\n========\n\nonError \(data))")
  }

  func onSuccess(data: String) {
    print("\n\n========\n\nonSuccess \(data))")
  }

  func onOrderCreated(data: String) {
    print("\n\n========\n\nonOrderCreated \(data))")
  }

  func onChargeCreated(data: String) {
    print("\n\n========\n\nonChargeCreated \(data))")
  }

  func onReady() {
    print("\n\n========\n\nonReady")
  }

  func onClick() {
    print("\n\n========\n\nonClicked")
  }

  func onCanceled() {
    print("\n\n========\n\nonCanceled")
  }
}


Generate the hash string

Import the Crypto import CryptoKit

Copy this helper method code

Swift
/**
     This is a helper method showing how can you generate a hash string when performing live charges
     - Parameter publicKey:             The Tap public key for you as a merchant pk_.....
     - Parameter secretKey:             The Tap secret key for you as a merchant sk_.....
     - Parameter amount:                The amount you are passing to the SDK, ot the amount you used in the order if you created the order before.
     - Parameter currency:              The currency code you are passing to the SDK, ot the currency code you used in the order if you created the order before. PS: It is the capital case of the 3 iso country code ex: SAR, KWD.
     - Parameter post:                  The post url you are passing to the SDK, ot the post url you pass within the Charge API. If you are not using postUrl please pass it as empty string
     - Parameter transactionReference:  The reference.trasnsaction you are passing to the SDK(not all SDKs supports this,) or the reference.trasnsaction  you pass within the Charge API. If you are not using reference.trasnsaction please pass it as empty string
     */
    func generateTapHashString(publicKey:String, secretKey:String, amount:Double, currency:String, postUrl:String = "", transactionReference:String = "") -> String {
        // Let us generate our encryption key
        let key = SymmetricKey(data: Data(secretKey.utf8))
        // For amounts, you will need to make sure they are formatted in a way to have the correct number of decimal points. For BHD we need them to have 3 decimal points
        let formattedAmount:String = String(format: "%.3f", amount)
        // Let us format the string that we will hash
        let toBeHashed = "x_publickey\(publicKey)x_amount\(formattedAmount)x_currency\(currency)x_transaction\(transactionReference)x_post\(postUrl)"
        // let us generate the hash string now using the HMAC SHA256 algorithm
        let signature = HMAC<SHA256>.authenticationCode(for: Data(toBeHashed.utf8), using: key)
        let hashedString = Data(signature).map { String(format: "%02hhx", $0) }.joined()
        return hashedString
    }


Call it as follows

Swift
let hashString:String = generateTapHashString(publicKey: publicKey, secretKey: secretString, amount: amount, currency: currency, postUrl: postUrl)


Pass it within the operator model

let operatorModel:[String:String] = ["publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": hashString]

Sample Callbacks Responses
onError
Swift
{
    "error":""
}

onOrderCreated
Swift
"ord_uAx145231127yHYS19Ou9B126"

onChargeCreated
Swift
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "CREATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

onSuccess
Swift
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "UPDATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "description": "",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=8D9e9fdEo5N03hWrGnROvEEFw4DfqYVFv8R7R34GITc%3d",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

Parameters Reference

Below you will find more details about each parameter shared in the above tables that will help you easily integrate BenefitPay-iOS SDK.

operator

Definition: It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...

Type: string (required)

Fields:

publicKey
Definition: This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.

Example:

Swift
let operator:[String:Any]: ["publicKey":"pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7", "hashString":""]

order

Definition: This defined the details of the order that you are trying to purchase, in which you need to specify some details like the id, amount, currency ...

Type: Dictionary, (required)

Fields:

id
Definition: Pass the order ID created for the order you are trying to purchase, which will be available in your database.
Note: This field can be empty
currency
Definition: The currency which is linked to the order being paid.
amount
Definition: The order amount to be paid by the customer.
Note: Minimum amount to be added is 0.1.
description
Definition: Order details, which defines what the customer is paying for or the description of the service you are providing.
reference
Definition: This will be the order reference present in your database in which the paying is being done for.

Example:

Swift
let order: [String: String] = [
    "id": "", "amount": 1, "currency": "SAR", "description": "Authentication description",
    "reference": "",
  ]

merchant

Definition: It is the Merchant id that you get from our onboarding team. This will be used as reference for your account in Tap.

Type: Dictionary (required)

Fields:

id
Definition: _Generated once your account with Tap is created, which is unique for every merchant.
_Example:

Swift
	let merchant:[String:String] = ["id":""]

invoice
Definition: After the token is generated, you can use it to pay for any invoice. Each invoice will have an invoice ID which you can add here using the SDK.
Note: An invoice will first show you a receipt/summary of the order you are going to pay for as well as the amount, currency, and any related field before actually opening the payment form and completing the payment.
Type: Dictionary (optional)
Fields:
id
Definition:Unique Invoice ID which we are trying to pay.
_Example:
Swift
let invoice:[String:String] = ["id":""]

customer
Definition: Here, you will collect the information of the customer that is paying using the token generate in the SDK.
Type: Dictionary (required)
Fields:
id
Definition: This is an optional field that you do not have before the token is generated. But, after the token is created once the card details are added, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.
name
Definition: Full Name of the customer paying.
Fields:
lang
Definition: Language chosen to write the customer name.
first
Definition: Customer's first name.
middle
Definition: Customer's middle name.
last
Definition: Customer's last name.
contact
Definition: The customer's contact information like email address and phone number.
Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.
Fields:
email
Definition: Customer's email address
Note: The email is of type string.
phone
Definition: Customer's Phone number details
countryCode
number

Example:

let customer: [String: Any] = [
      "id": "", "name": [["lang": "en", "first": "TAP", "middle": "", "last": "PAYMENTS"]],
      "contact": [
        "email": "tap@tap.company", "phone": ["countryCode": "+965", "number": "88888888"],
      ],
    ]

interface

Definition: This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...

Type: Dictionary (optional)

Fields:

loader
_Definition: _A boolean to indicate wether or not you want to show a loading view on top of the card form while it is performing api requests.
locale
_Definition: _The language of the card form. Accepted values as of now are:
Possible Values:
en(for english)
ar(for arabic).
theme
Definition: The display styling of the card form. Accepted values as of now are:
Options:
light
dark
dynamic ( follow the device's display style )
edges
_Definition: _Control the edges of the payment form.
Possible Values:
curved
flat
colorStyle
Definition: How do you want the icons rendered inside the card form.
Possible Values:
colored
monochrome

Example:

Swift
let interface: [String: String] = [
      "locale": "en", "theme": "light", "edges": "curved",
      "colorStyle": "colored", "loader": true,
    ]

post
Definition: Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.
Type: Dictionary (optional)
Fields:
url
Definition: The webhook server's URL that you want to receive notifications on.
Example:
Swift
let post:[String:String] = ["url":""]


Updated over 1 year ago

Web
Android
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Sample Demo
Step 1: Requirements
Step 2: Get Your Public Keys
Step 3: Installation
Step 4: Integrating BenefitPay-iOS
Integration Flow
Initialising the UI
Step 5: Choose your Integration
Simple Integration
Advanced Integration
Generate the hash string
Sample Callbacks Responses
Parameters Reference
operator
order
merchant
invoice
customer
interface
post

URL: https://developers.tap.company/docs/knet

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
KFAST
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
KNET

KNET is a Kuwaiti based domestic payment option, comes with debit cards.

📘

It's a Redirection Payment Page Flow

Redirection on the KNET payment page is a must, to enter the card information and complete the processing.

Knet accepts KWD currency only. It supports authorization now.

KFAST: KNET also provides the save card functionality, called KFAST.

API Call for KNET

Sample to control the source object in the charge API: "src_kw.knet" with currency 'KWD' only

JSON
{
...
	"currency": "KWD",
	"source": {
		"id": "src_kw.knet"
}
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd"
 },
 "redirect": {
    "url": "https://customer.redirection_url"
  }
...
}


API Response

A transaction URL is expected in the API response details. This will redirect the customer to the Benefit Payment Page

JSON
{
...
"id": "chg_TS05A1320231018Hy56070XXXX",
"status": "INITIATED",
"transaction": {  
	 "timezone": "UTC+03:00",  
	 "created": "1671563769240",  
	 "url": "<https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=d6aPjTalvIV03hWrGnROvO3i8B2ED7hkBbPL8PY%2fzEY%3d">,
 "expiry": {  
 	"period": 30,  
	 "type": "MINUTE"  
	  },  
...
}

KNET payment page

Customer experience journey

Post payment details

Sample webhook response (post payment details)

Sample
Header
"id": "chg_TS05A1320231018Hy56070XXXX",
  "object": "charge",
  "live_mode": false,
  "api_version": "V2",
  "method": "POST",{
  "status": "CAPTURED",
  "amount": 0.5,
  "currency": "KWD",
  "threeDSecure": true,
  "card_threeDSecure": false,
  "save_card": false,
  "merchant_id": "",
  "product": "",
  "statement_descriptor": "Sample",
  "description": "Test Description",
  "metadata": {
    "udf1": "test 1",
    "udf2": "test 2"
  },
  "transaction": {
    "authorization_id": "B63465",
    "timezone": "UTC+03:00",
    "created": "1671563769240",
    "expiry": {
      "period": 30,
      "type": "MINUTE"
    },
    "asynchronous": false,
    "amount": 0.5,
    "currency": "KWD"
  },
  "reference": {
    "track": "tck_TS010920221916Hr112012834",
    "payment": "9720221916128348054",
    "gateway": "202235421476242",
    "acquirer": "235410001666",
    "transaction": "txn_0001",
    "order": "ord_0001"
  },
  "response": {
    "code": "000",
    "message": "Captured"
  },
  "gateway": {
    "response": {
      "code": "00",
      "message": "CAPTURED"
    }
  },
  "receipt": {
    "id": "209020221916128803",
    "email": true,
    "sms": false
  },
  "customer": {
    "id": "cus_TS020920221916q8YJ2012896",
    "first_name": "Waleed",
    "last_name": "Asghar",
    "email": "w.asghar@tap.company",
    "phone": {
      "country_code": "971",
      "number": "586275033"
    }
  },
  "merchant": {
    "country": "BH",
    "currency": "KWD",
    "id": "18778851"
  },
  "source": {
    "object": "source",
    "type": "CARD_NOT_PRESENT",
    "payment_type": "DEBIT",
    "payment_method": "KNET",
    "channel": "INTERNET",
    "id": "src_kw.knet"
  },
  "redirect": {
    "status": "PENDING",
    "url": "https://webhook.site/9819d5ef-506a-4d1e-a0c3-072ccfcd95a3"
  },
  "post": {
    "attempt": 1,
    "status": "PENDING",
    "url": "https://webhook.site/9819d5ef-506a-4d1e-a0c3-072ccfcd95a3"
  },
  "activities": [
    {
      "id": "activity_TS070920221916t8HK2012928",
      "object": "activity",
      "created": 1671563769240,
      "status": "INITIATED",
      "currency": "KWD",
      "amount": 0.5,
      "remarks": "charge - created"
    },
    {
      "id": "activity_TS043920221936t3PX2012101",
      "object": "activity",
      "created": 1671564999101,
      "status": "CAPTURED",
      "currency": "KWD",
      "amount": 0.5,
      "remarks": "charge - captured"
    }
  ],
  "auto_reversed": false
}





Updated 7 months ago

Fawry
KFAST
Did this page help you?
Yes
No
TABLE OF CONTENTS
API Call for KNET
API Response
KNET payment page
Post payment details

URL: https://developers.tap.company/reference/lead

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Create a Lead
POST
Retrieve a Lead
GET
Create a Connect URL
POST
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Lead

The section will describe the lead API overview, request and response model.

The Lead API facilitates the creation of leads and the merchant onboarding process by enabling the efficient submission and validation of essential KYC details. By using this API, businesses can efficiently manage and automate the initial steps of onboarding new merchants or clients.

Benefits for Businesses:
Improved Onboarding Speed: By streamlining the lead creation and KYC submission processes, businesses can onboard merchants more quickly, reducing the time to revenue.
Regulatory Compliance: The API ensures that all KYC information is collected in accordance with regulatory requirements, helping businesses avoid penalties and legal issues.
Scalability: The Lead API can handle large volumes of leads and onboarding requests, making it suitable for businesses of all sizes.
Key Considerations:
Unique entity Information: Each lead should be associated with a unique legal entity
Distinct Email Addresses: Please ensure to provide a unique email address for each lead.
Separate Brand details: When onboarding multiple merchants or clients, it's essential to provide unique brand information for each submission.
Mandatory Field: Treat the National ID as a mandatory field for all Saudi merchants. The Lead API submission should be configured to reject any submission for Saudi merchants that lacks a valid National ID. This helps in maintaining compliance with local regulations and prevents incomplete data submissions.
Segment Keys

Tap will generate keys (Public Key - Secret Key) for your segment:

Segment must use the secret key in case of any direct API call.
Segment must use the public key in the integration with connect SDK.
Files API

Before passing any files to the Lead API, you must create them using the TAP Files API. The Files API enables you to upload and manage the files associated with the lead.

Lead API

Once you have the segment keys and any required files in place, you can use the Lead API to send the merchant information and initiate the onboarding process.

POST https://api.tap.company/v3/connect/lead

Request
cURL
curl --request POST \
  --url https://api.tap.company/v3/connect/lead \
  --header 'Authorization: Bearer sk_test_xxxx' \
  --header 'Content-Type: application/json' \
  --data '{
   "brand":{
      "name":{
         "en":"merchantNameEn",
         "ar":"merchantNameAr"
      },
      "sector":[
         "telecom",
         "finance"
      ],
      "logo":"file_xxxx",
      "channel_services":[
         {
            "channel":"website",
            "address":"https://www.website.company"
         },
         {
            "channel":"twitter",
            "address":"https://twitter.com/xxxx"
         },
         {
            "channel":"instagram",
            "address":"https://www.instagram.com/company/xxxx"
         },
         {
            "channel":"ios",
            "address":"IOS App Name"
         },
         {
            "channel":"android",
            "address":"Android App Name"
         }
      ],
      "operations":{
         "start_date":"2021-10-10",
         "sales":{
            "period":"monthly",
            "range":{
               "from":"10000",
               "to":"80000"
            },
            "currency":"SAR"
         },
         "customer_base":{
            "period":"monthly",
            "range":{
               "from":"10000",
               "to":"20000"
            },
            "locations":[
               "local",
               "regional"
            ]
         }
      },
      "terms":[
         {
            "term":"general",
            "agree":true
         },
         {
            "term":"chargeback",
            "agree":true
         },
         {
            "term":"refund",
            "agree":true
         }
      ]
   },
   "entity":{
      "country":"SA",
      "is_licensed":true,
      "license":{
         "number":"xxxx",
         "references":[
            {
               "reference":"xxxx",
               "type":"unified_number"
            }
         ],
         "country":"SA",
         "city":"Riyadh",
         "type":"commercial_registration",
         "issuing_date":"2024-04-01",
         "expiry_date":"2024-04-01",
         "documents":[
            {
               "type":"commercial_registration",
               "number":"xxxx",
               "issuing_country":"SA",
               "issuing_date":"2024-04-01",
               "expiry_date":"2024-04-01",
               "images":[
                  "file_xxxx"
               ]
            },
            {
               "type":"memorandum_of_association",
               "number":"1243577890",
               "issuing_country":"SA",
               "issuing_date":"2019-07-09",
               "expiry_date":"2021-07-09",
               "images":[
                  "file_xxxx"
               ]
            }
         ]
      },
      "tax":{
         "number":"xxxx",
         "issuing_date":"2023-01-20",
         "expiry_date":"2023-01-20",
         "documents":[
            {
               "type":"TAX Document",
               "number":"xxxx",
               "issuing_country":"SA",
               "issuing_date":"2019-07-09",
               "expiry_date":"2021-07-09",
               "images":[
                  "file_xxxx"
               ]
            }
         ]
      }
   },
   "wallet":{
      "bank":{
         "name":"Ryiadh Bank",
         "account":{
            "name":"ABC",
            "number":"77777777777",
            "swift":"77777777777",
            "iban":"SA0xxxx59584"
         },
         "documents":[
            {
               "type":"Bank Statement",
               "number":"xxxx",
               "issuing_country":"SA",
               "issuing_date":"2019-07-09",
               "images":[
                  "file_xxxx"
               ]
            }
         ]
      }
   },
   "user":{
      "name":{
         "lang":"en",
         "title":"Mr",
         "first":"John",
         "middle":"Bob",
         "last":"Doe"
      },
      "email":[
         {
            "type":"WORK",
            "address":"user@abc.com",
            "primary":true
         }
      ],
      "phone":[
         {
            "type":"WORK",
            "country_code":"966",
            "number":"xxxx",
            "primary":true
         }
      ],
      "address":[
         {
            "type":"HOME",
            "line1":"line1",
            "line2":"line2",
            "line3":"line3",
            "line4":"line4",
            "avenue":"",
            "street":"",
            "building":"",
            "apartment":"",
            "country":"SA",
            "state":"Saudi",
            "city":"Riyadh",
            "area":"",
            "zip_code":"30003",
            "postal_code":""
         }
      ],
      "birth":{
         "city":"Riyadh",
         "country":"SA"
      },
      "nationality":"SA",
      "identification":{
         "number":"1087078604",
         "type":"national_id",
         "issuer":"SA"
      },
      "primary":true
   },
   "post":{
      "url":"http://example.com/postUrl"
   },
   "metadata":{
      "mtd":"metadata"
   }
}'

Response

Same request data sent will be available in the response along with the lead ID

JSON
{
	"id": "led_xxxx",
	"brand": {
		"name": {
			"en": "merchantNameEn",
			"ar": "merchantNameAr"
		},
		"sector": [
			"telecom",
			"finance"
		],
		"logo": "file_xxxx",
		"channel_services": [
			{
				"channel": "website",
				"address": "https://www.website.company/"
			},
			{
				"channel": "twitter",
				"address": "https://twitter.com/xxxx"
			},
			{
				"channel": "instagram",
				"address": "https://www.instagram.com/company/xxxx"
			},
			{
				"channel": "ios",
				"address": "IOS App Name"
			},
			{
				"channel": "android",
				"address": "Android App Name"
			}
		],
		"operations": {
			"start_date": "2021-10-10",
			"sales": {
				"period": "monthly",
				"range": {
					"from": "10000",
					"to": "80000"
				},
				"currency": "SAR"
			},
			"customer_base": {
				"period": "monthly",
				"range": {
					"from": "10000",
					"to": "20000"
				},
				"locations": [
					"local",
					"regional"
				]
			}
		},
		"terms": [
			{
				"term": "general",
				"agree": true
			},
			{
				"term": "chargeback",
				"agree": true
			},
			{
				"term": "refund",
				"agree": true
			}
		]
	},
	"entity": {
		"country": "SA",
		"is_licensed": true,
		"license": {
			"number": "xxxx",
			"references": [
				{
					"reference": "xxxx",
					"type": "unified_number"
				}
			],
			"country": "SA",
			"city": "Riyadh",
			"type": "commercial_registration",
			"issuing_date": "2024-04-01",
			"expiry_date": "2024-04-01",
			"documents": [
				{
					"type": "commercial_registration",
					"number": "1010951143",
					"issuing_country": "SA",
					"issuing_date": "2024-04-01",
					"expiry_date": "2024-04-01",
					"images": [
						"file_xxxx"
					]
				},
				{
					"type": "memorandum_of_association",
					"number": "1243577890",
					"issuing_country": "SA",
					"issuing_date": "2019-07-09",
					"expiry_date": "2021-07-09",
					"images": [
						"file_643320430437906816"
					]
				}
			]
		},
		"tax": {
			"number": "12435778912",
			"issuing_date": "2023-01-20",
			"expiry_date": "2023-01-20",
			"documents": [
				{
					"type": "TAX Document",
					"number": "12435778912",
					"issuing_country": "SA",
					"issuing_date": "2019-07-09",
					"expiry_date": "2021-07-09",
					"images": [
						"file_xxxx"
					]
				}
			]
		}
	},
	"wallet": {
		"bank": {
			"name": "Ryiadh Bank",
			"account": {
				"name": "ABC",
				"number": "77777777777",
				"swift": "77777777777",
				"iban": "SA04xxxx59584"
			},
			"documents": [
				{
					"type": "Bank Statement",
					"number": "9876573221",
					"issuing_country": "SA",
					"issuing_date": "2019-07-09",
					"images": [
						"file_xxxx"
					]
				}
			]
		}
	},
	"user": {
		"name": {
			"lang": "en",
			"title": "Mr",
			"first": "John",
			"middle": "Bob",
			"last": "Doe"
		},
		"email": [
			{
				"type": "WORK",
				"address": "user@abc.com",
				"primary": true
			}
		],
		"phone": [
			{
				"type": "WORK",
				"country_code": "966",
				"number": "5987657",
				"primary": true
			}
		],
		"address": [
			{
				"type": "HOME",
				"line1": "line1",
				"line2": "line2",
				"line3": "line3",
				"line4": "line4",
				"avenue": "",
				"street": "",
				"building": "",
				"apartment": "",
				"country": "SA",
				"state": "Saudi",
				"city": "Riyadh",
				"area": "",
				"zip_code": "30003",
				"postal_code": ""
			}
		],
		"birth": {
			"city": "Riyadh",
			"country": "SA"
		},
		"nationality": "SA",
		"identification": {
			"number": "xxxx",
			"type": "national_id",
			"issuer": "SA"
		},
		"primary": true
	},
	"post": {
		"url": "http://example.com/postUrl"
	},
	"metadata": {
		"mtd": "metadata"
	},
	"reference_lead_id": "xxxx"
}


Updated 6 months ago

Download Payouts
Create a Lead
Did this page help you?
Yes
No
TABLE OF CONTENTS
Benefits for Businesses:
Key Considerations:
Segment Keys
Files API
Lead API
Request
Response

URL: https://developers.tap.company/docs/liability-shift-customer-vs-merchant

ACCEPTANCE
Saved Cards
Payment Agreement and Contracts
Creating Payment Agreement
Merchant Initiated Transaction
Liability Shift: Customer vs Merchant
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Liability Shift: Customer vs Merchant

Understanding who bears the responsibility for fraudulent activity or unauthorized charges — known as the liability shift — is vital for customers and merchants. This section examines two scenarios: one where a customer initiates a transaction with 3D Secure (3DS) and subsequent transactions without it, and another involving non-3DS transactions initiated by either party.

Liability shift to the customer:

In scenarios where the customer initiates a 3DS transaction, they assume liability for any fraudulent or unauthorized charges. Completing the 3DS verification typically reduces their risk of fraud. However, should the merchant process subsequent non-3DS transactions under a payment agreement referencing the customer's initial 3DS transaction, the customer might retain liability.

Example: A customer makes a verified online purchase via 3DS, reducing their fraud liability. Yet, if the merchant processes later non-3DS transactions under the same agreement and fraud occurs, the customer could be held accountable.

Liability shift to the merchant

Conversely, when a non-3DS transaction is customer-initiated, such as a "card not present" transaction, the merchant often assumes liability for any unauthorized or fraudulent charges. If a non-3DS transaction is later contested as fraudulent, the merchant typically bears the financial loss or chargebacks.

Example: A customer completes an online purchase without 3DS verification. If they dispute subsequent charges as unauthorized, liability usually shifts to the merchant, who must handle the financial repercussions and any chargebacks.

It's crucial for both parties to understand the implications of the liability shift in payment transactions. Merchants and customers must follow industry best practices and maintain robust security to minimize fraud and uphold a secure payment ecosystem, recognizing their obligations and the associated risks.

Updated about 1 year ago

Merchant Initiated Transaction
Recurring Payments
Did this page help you?
Yes
No
TABLE OF CONTENTS
Liability shift to the customer:
Liability shift to the merchant

URL: https://developers.tap.company/reference/list-all-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List All Authorize
POST
https://api.tap.company/v2/authorize/list

This endpoint returns a sorted list of previously created authorizations, with the most recent authorizations appearing first.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
period
object

The date range of the required authorizes.

PERIOD OBJECT
status
string

The status by which the list of authorized transactions need to be retrieved. Accepted values: INITIATED, IN_PROGRESS, ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, AUTHORIZED, CAPTURED, VOID, TIMEDOUT, UNKNOWN.

sources
array of strings

The list of source_id's that to be retrieved.

ADD STRING
payment_methods
string

The array of payment methods to be retrieved.

customers
array of strings

The array of customer_id's to be retrieved.

ADD STRING
authorizes
string

The array of authorize_id's to be retrieved.

starting_after
string

The cursor for use in pagination which is an authorize ID that defines the place of an authorize_id in the list. For instance, if 50 authorizes are retrieved ending with cus_foo, then the subsequent call can include starting_after=cus_foo in order for the next page of the list to be retrieved.

limit
string
Defaults to 50

The maximum number of authorized transactions to return in a single call. Default: 25 Maximum: 50.

RESPONSES
200

200

400

400

Updated almost 2 years ago

Void an Authorize
Download Authorize
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/authorize/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "period": {
9
    "date": {
10
      "from": 1662035009000,
11
      "to": 1664367809000
12
    }
13
  },
14
  "limit": "50"
15
}
16
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/list-all-cards

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
Retrieve a Card
GET
Verify a Card
POST
Delete a Card
DELETE
List All Cards
GET
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List All Cards
GET
https://api.tap.company/v2/card/{customer_id}

This endpoint can be used to see a list of all the saved cards. The object always displays the 10 most recent sources. To view additional saved cards beyond the default 10, use the API with the 'limit' and 'starting_after' parameters.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
customer_id
string
required
Defaults to cus_TS030820221913o9P40906154

The ID of the customer whose saved cards need to be retrieved.

RESPONSES
200

200

404

404

Updated about 1 year ago

Delete a Card
Invoices
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/card/cus_TS030820221913o9P40906154 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
404 - Result

URL: https://developers.tap.company/reference/list-all-charges

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Create a Charge
POST
Retrieve a Charge
GET
Update a Charge
PUT
List all Charges
POST
Download Charges
POST
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List all Charges
POST
https://api.tap.company/v2/charges/list

This endpoint returns a list of all previously created charges, with the most recent charges appearing first.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
period
object

Retrieve charges for a selected period

PERIOD OBJECT
status
string

Retrieve the selected list of charges info by charge status. Values can be: INITIATED, IN_PROGRESS, ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, CAPTURED, VOID, TIMEDOUT or UNKNOWN

sources
array of strings

Array of sources (you can specify the list of Source ID's to retrieve).

ADD STRING
payment_methods
array of strings

Array of payment methods (you can specify the list of payment method Source ID's to retrieve).

ADD STRING
customers
array of strings

Array of customers (you can specify the list of Customer ID's to retrieve).

ADD STRING
charges
array of strings

Array of charges (you can specify the list of Source ID's to retrieve).

ADD STRING
starting_after
string

A cursor for use in pagination. The starting_after parameter takes a charge ID that determines your position in the list. For example, if your list request returns 50 charges that end with cus_foo, you can use starting_after=cus_foo in your next call to retrieve the next page of the list.

charge_created
string

Created date (charge created date), Measured in Unix Epoch Timestamp (milliseconds).

mobile
string

Filter the results based on customer mobile number

email
string

filter the results based on customer email

limit
string
Defaults to 25

The maximum number of charges to return in a single call. Default: 25; Maximum: 50.

order
string

Sort the results Ascending or Descending by date

chronological
reverse_chronological
order_by
string
Defaults to date

Applying the sorting based on

metadata
string

Filter the results based on meta data values

currency
string

Filter the charges based on charge currency

payouts
object

Retrieve charges based on payouts

PAYOUTS OBJECT
reference
object
REFERENCE OBJECT
RESPONSES
200

200

400

400

Updated 12 months ago

Update a Charge
Download Charges
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/charges/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "period": {
9
    "date": {
10
      "from": "1662190768000",
11
      "to": "1662536368000"
12
    },
13
    "type": "1"
14
  },
15
  "limit": "25",
16
  "order_by": "date"
17
}
18
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/list-all-customers

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List all Customers
GET
https://api.tap.company/v2/customers/list

This endpoint returns a list of previously created customers, with the most recent customers appearing first.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
period
object

Retrieve customers during a selected period

PERIOD OBJECT
customers
array of strings

Array of customers (you can specify the list of customer ID's to retrieve)

ADD STRING
starting_after
string

A cursor for use in pagination. starting_after is a Customer ID that defines your place in the list. For instance, if you make a list request and receive 50 customers, ending with cus_foo, your subsequent call can include starting_after=cus_foo in order to fetch the next page of the list.

limit
int32

The maximum number of customers to return in a single call. Default:25; Maximum: 50

RESPONSES
200

200

400

400

Updated 11 months ago

Delete a Customer
Files
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request GET \
2
     --url https://api.tap.company/v2/customers/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/list-all-destinations

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Retrieve a Destination
GET
List All Destinations
POST
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List All Destinations
POST
https://api.tap.company/v2/destination/list

This endpoint can be used to list all destinations.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
limit
int32
required
Defaults to 10

The maximum number of destinations to return in a single call. Minimum: 1; Maximum: 50.

page
int32
required
Defaults to 1

The default is 1. It will help you when you apply a pagination to get the destinations.

RESPONSES
200

200

400

400

Updated 19 days ago

Retrieve a Destination
Merchant
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/destination/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "limit": 10,
9
  "page": 1
10
}
11
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/list-all-invoices

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List all Invoices
POST
https://api.tap.company/v2/invoices/list
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
BODY PARAMS
period
object

Retrieve invoices for a selected period

PERIOD OBJECT
RESPONSES
200

200

400

400

Updated 10 months ago

Finalize an Invoice
Payout
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/invoices/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "period": {
9
    "date": {
10
      "from": "1707041339041",
11
      "to": "1707071339041"
12
    }
13
  }
14
}
15
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/list-all-refunds

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
Create a Refund
POST
Retrieve a Refund
GET
Update a Refund
PUT
List All Refunds
POST
Download Refunds
POST
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
List All Refunds
POST
https://api.tap.company/v2/refunds/list

This endpoint returns a list of all refunds you’ve previously created. The refunds are returned in sorted order, with the most recent refunds appearing first.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
BODY PARAMS
period
object

Retrieve Refunds during a selected Period

PERIOD OBJECT
refunds
array of strings

Array of refunds ( you can specify the list of refund id's to retrieve)

ADD STRING
charges
array of strings

Array of charges ( you can specify the list of charge id's to retrieve the refund info)

ADD STRING
starting_after
string

A cursor for use in pagination. starting_after is an Refund ID that defines your place in the list. For instance, if you make a list request and receive 50 refunds, ending with cus_foo, your subsequent call can include starting_after=cus_foo in order to fetch the next page of the list.

limit
int32

The limit to the number of refunds to return in a single call. default: 25 maximum: 50

RESPONSES
200

200

400

400

Updated over 1 year ago

Update a Refund
Download Refunds
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/refunds/list \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/magento

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Magento

Simplifying Tap Payments Integration for Your Magento Store

Introduction

This guide provides step-by-step instructions for installing and configuring Tap Payments’ plugin for Magento, enabling a seamless and secure payment experience for your customers.

🚧

This guide assumes that Magento is already installed on your system, with one of the following versions:

Adobe Commerce (cloud): 2.4.x
Adobe Commerce (on-prem): 2.4.x
Magento Open Source: 2.4.x

You can install our Magento plugin from here.

Supported Features
Merchant Onboarding directly from the Magento platform
3D Secure 2.0
Different checkout modes:
Popup
Redirection
Card Saving
Apple Pay
Alternative payment methods
Web Card SDK
KNET
Benefit
Tabby
Fawry
Installation Guide
Using Composer
Access the root directory of your Magento server, usually located at /var/www/html.
Use one of these commands:
bash
composer require tappayments/module-payment-gateway
composer require tappayments/module-payment-gateway:1.0.3

If prompted for authentication, use the access keys from your Magento account at the following link:
Adobe Commerce Marketplace Access Keys
Once the installation is complete, recompile your Magento 2 installation and clear the cache before configuring the plugin. Execute the following commands in order:
bash
php bin/magento setup:upgrade  
php bin/magento setup:di:compile  
php bin/magento setup:static-content:deploy -f  
php bin/magento indexer:reindex  
php bin/magento cache:clean


You are now ready to configure the plugin.

Configuration Guide

Log in to the admin panel and navigate to Stores -> Configuration to set up your plugin.

Store Configuration

Under General -> Store Information, configure the following details:

Store Name: Enter your store's name.
Store Number: Provide the store's contact phone number.
Country: Select the country where your store is based.

Next, go to General -> Store Email Addresses to set your store's contact email address.

Plugin Configuration

Once the store details are configured, proceed with the onboarding:

Navigate to Sales -> Payment Methods.
Switch to Tap Payment Method.
Click the 'Connect' button.

The system will automatically gather your configured store information and email address, redirecting you to Tap Payments to complete the setup.

After completing the Tap Payments registration, you'll be redirected back to the Tap Payments configuration page in Magento. The extension will automatically configure all required keys and merchant information for transactions.

Basic Configuration

Configure the fundamental settings for Tap payments to ensure proper integration and functionality. These options are crucial for setting up Tap payments.

Name	Description
Status	Activate Tap as a payment method.
Sandbox Mode	Toggle this setting to use the sandbox environment for testing and debugging.
Debug	Enable debug mode to log information for troubleshooting.
Transaction Mode	Select the mode for processing transactions (e.g., Charge/Capture).
Merchant ID	Your unique identifier for your account provided by Tap. Will be auto filled after the onboarding.
Test Public Key	The public key for the sandbox mode. Will be auto filled after the onboarding.
Test Secret Key	The secret key for the sandbox mode. Will be auto filled after the onboarding.
Live Public Key	The public key for live transaction processing. Will be auto filled after the onboarding.
Live Secret Key	The secret key for live transaction processing. Will be auto filled after the onboarding.

Ensure all keys and modes are correctly set according to your environment (sandbox or live) to facilitate smooth payment processing.

Card Payment Configuration

Optimize your checkout process with Tap Payments by choosing between two dynamic payment modes: Popup or Redirect. Here’s a guide on the setup:

Enable: Turn this payment method on.

Checkout Mode: Choose between Popup or Redirect.

Popup Mode: The customer remains on your website, and a popup appears after they click the "Place Order" button to enter their credit/debit card details. A live demo can be found here .Below is a screenshot example of the popup mode:

Redirect Mode: Customers are redirected to the Tap Payments checkout page to complete the transaction. Below is a screenshot of the redirect mode:

Popup/Redirect Title: Set the title that appears at checkout. Below is an example of a title set to Tap PopUp:

Popup/Redirect Theme: Choose the theme for the popup or payment form. Available themes include:

Dark
Light
Dynamic

Save Card Option: Enable the option to allow customers to save their cards for future use.

3D Secure: Enable 3D Secure.

Cardholder Name: Enable this field if you wish to ask customers for their name during checkout.

Tap Payments supports the following card schemes:

Visa
Mastercard
Mada
American Express
OmanNet
Benefit

For more details about card payments, refer to the Card Payments guide.

Test your integration
Go to your store and add a product to your cart.
Proceed to the checkout page.
Select the Tap payment method.
Enter the following card details:
Card Number: 5123450000000008
Expiry Date: 01/39
CVV: 123
For a full list of test cards available, please refer to this guide
Place your order. You will be redirected to the receipt (order confirmation) page.
Go Live

If you're satisfied with your results and ready to start accepting payments, disable sandbox mode to start accepting real payments.

Alternative Payment Methods

Configure various payment methods to ensure a seamless checkout experience for your customers, tailored to your store's currency requirements.

Web Card SDK Configuration
Status: Enable this option to allow customers to use the web card SDK.
Card SDK Title: Enter the title that will be displayed for the card SDK on the checkout page.
Theme: Select a theme for the embedded Card SDK form. Available themes include:
Light.
Dark.
Payment Brand: Decide if you want to show the payment brand logo at checkout.
Card Style: Configure the style of the payment card input field. Available styles include:
Curved.
Straight.
Language: Configure the language for the native checkout. Available languages include:
Arabic.
English.
Dynamic.
Cardholder Name: Choose whether to request the cardholder's name during checkout.

You can find a demo on the web card SDK here and below is a screenshot of the web card SDK on the Magento checkout page:

Apple Pay Configuration
Status: Enable this option to allow customers to use Apple Pay as a payment method.
Apple Pay Title: Enter the title that will be displayed for Apple Pay on the checkout page.
Theme: Choose the theme for the Apple Pay button.

For Apple Pay to function properly, there are a few essential prerequisites that need to be met. These requirements ensure a smooth integration and operation of Apple Pay on your website. You can review the full list of prerequisites, including supported devices, certificates, and platform-specific guidelines, by referring to the official documentation here.

KNET Configuration
Status: Enable KNET payment.
KNET Title: Set the title for KNET on the checkout page.

Ensure that your store’s currency is set to KWD for the KNET payment option to be available at checkout. For more details about this payment method, refer to the KNET guide

Benefit Configuration
Status: Enable this option to allow customers to use Benefit as a payment method.
Benefit Title: Set the title for Benefit on the checkout page.

Make sure your store’s currency is set to BHD for the Benefit payment option to be available at checkout. For more details about this payment method, refer to the Benefit guide

Tabby Configuration
Status: Enable this option to allow customers to use Tabby as a payment method.
Tabby Title: Enter the title that will be displayed for Tabby on the checkout page.

Ensure that your store’s currency is set to AED, SAR, or KWD for the Tabby payment option to be available at checkout. For more details about this payment method, refer to the Tabby guide

Fawry Configuration
Status: Enable this option allow customers to use Fawry as a payment method.
Fawry Title: Enter the title that will be displayed for Fawry on the checkout page.

Ensure that your store’s currency is set to EGP for the Fawry payment option to be available at checkout. For more details about this payment method, refer to the Fawry guide

Updated 2 months ago

Woocommerce
Webhook
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Supported Features
Installation Guide
Using Composer
Configuration Guide
Store Configuration
Plugin Configuration
Basic Configuration
Card Payment Configuration
Test your integration
Go Live
Alternative Payment Methods
Web Card SDK Configuration
Apple Pay Configuration
KNET Configuration
Benefit Configuration
Tabby Configuration
Fawry Configuration

URL: https://developers.tap.company/docs/merchant-initiated-transaction

ACCEPTANCE
Saved Cards
Payment Agreement and Contracts
Creating Payment Agreement
Merchant Initiated Transaction
Liability Shift: Customer vs Merchant
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Merchant Initiated Transaction

To process a charge as a merchant-initiated transaction, you must set the "customer_initiated" boolean to false and the "3DSecure" to false, and also provide a Payment Agreement ID. Without this ID, an error will occur due to the missing "agreement_id." This ID is essential for non-3D Secure transactions as it links the charge to the payment agreement associated with the customer's saved card.

JSON
{  
	"errors": [  
		{  
			"code": "1216",  
			"description": "Agreement id is missing"  
		}  
	],  
	"http_code": "400"  
}

Creating a Non-3D Secure Charge with a Payment Agreement

Obtain the valid payment agreement ID:Ensure you have the correct payment agreement ID associated with the saved card. This can be done by creating the agreement in advance and noting its ID, or by having it generated automatically during the agreement creation process. The ID must correspond to the associated contract—be it a saved card ID, subscription ID, invoice ID, or order ID.

Verify the customer ID: Confirm that you possess a valid customer ID that matches the customer linked to the saved card. This step is vital to ensure the charge is accurately associated with the correct customer account.

Generate a valid token ID: Use the saved card ID and customer ID to generate a token ID. This token acts as a secure identifier for the saved card during the charging process.

Specify the initiator of the transaction: Determine who is initiating the transaction. Set the "customer_initiated" boolean to true for customer-led transactions, which typically involve 3D Secure authentication. For merchant-initiated transactions, set this boolean to false.

By following these steps and correctly providing all necessary parameters—including the payment agreement ID, customer ID, and token ID—and setting the "customer_initiated" boolean appropriately while disabling "3D Secure," you can successfully create a charge. This process enables you to invoice the customer as per the agreement's terms without the need for 3D Secure authentication.

📘

For enabling non-3D Secure transactions in a live environment, please contact your Tap account manager to activate the necessary settings on your merchant account.

How to Create a Charge Using a Payment Agreement: Understanding Request Parameters and Process

To initiate a charge under a payment agreement, certain parameters matching the agreed-upon merchant and customer terms must be included in your charge request. When these parameters are correctly configured, you can process a charge without requiring 3D Secure authentication, as it will be based on the payment agreement's prior authorization.

For illustrative purposes, a sample charge request is provided below in URL format. Use this as a model, inserting your unique details and settings, to properly formulate your charge request. Essential parameters linking the charge to the payment agreement will be outlined.

cURL
curl --request POST \
  --url https://api.tap.company/v2/charges \
  --header 'authorization: Bearer sk_test_wXOnrWkK2d9BbFCHj3gf6V1v' \
  --header 'content-type: application/json' \
  --header 'lang_code: EN' \
  --data '{
	"amount": 1,
	"currency": "SAR",
	"payment_agreement": {
		"id": "payment_agreement_TS05A1920230911b2K12105431",
	},
	"customer_initiated": "false",
	"threeDSecure": true,
	"save_card": false,
	"description": "Test Description",
	"statement_descriptor": "Sample",
	"metadata": {
		"udf1": "test 1",
		"udf2": "test 2"
	},
	"reference": {
		"transaction": "txnss_0001",
		"order": "ord_0001&&&"
	},
	"receipt": {
		"email": false,
		"sms": true
	},
	"customer": {
		"id": "cus_TS01A0520231538Ps321805785"
	},
	"merchant": {
		"id": ""
	},
	"source": {
		"id": "tok_ex6t5523232urdf21fu44961"
	},
	"post": {
		"url": "https://posturl"
	},
	"redirect": {
		"url": "https://bfc-test.com"
	}
}'


In the provided charge request, the relevant parameters related to the payment agreement are as follows:

Parameter	Description	Example
threeDSecure	This parameter is set to false, indicating that the transaction should be processed without 3D Secure authentication. It aligns with the agreement terms, allowing the merchant to charge the customer without the additional security step.	
save_card	This parameter is set to false, indicating that the customer's card details will not be saved for future use. This aligns with the concept of the payment agreement, which prioritizes the transaction itself rather than storing the card information for recurring charges.	
customer	Within the "customer" object, the "id" field specifies the customer ID. Ensures that the charge is associated with the correct customer.	
source	The "source" object contains the "id" field, which represents the token ID of the saved card. This token ID is created using the saved card ID and the customer ID, serving as a secure identifier throughout the charging process.	
customer_initiated	This parameter is set to "false," indicating that the merchant is initiating the transaction on behalf of the customer. This aligns with the discussion on differentiating between customer-initiated and merchant-initiated transactions.	
payment_agreement	Within the "payment_agreement" object, the "id" field specifies the payment agreement ID. It links the charge to the specific agreement established between the merchant and the customer. The agreement ID allows the merchant to charge the customer based on the terms agreed upon.	

Including the specified parameters in the charge request ensures the transaction adheres to the payment agreement. Consequently, the merchant can charge the customer without the need for 3D Secure authentication, in line with the agreed-upon terms and conditions.

Charge Response with Payment Agreement Created
JSON
{
	"id": "chg_TS03A4020230203x2XZ2205881",
	"object": "charge",
	"live_mode": false,
	"customer_initiated": false,
	"api_version": "V2",
	"method": "CREATE",
	"status": "CAPTURED",
	"amount": 1.00,
	"currency": "SAR",
	"threeDSecure": false,
	"card_threeDSecure": false,
	"save_card": false,
	"merchant_id": "",
	"product": "GOSELL",
	"statement_descriptor": "Sample",
	"description": "Test Description",
	"metadata": {
		"udf1": "test 1",
		"udf2": "test 2"
	},
	"transaction": {
		"authorization_id": "157811",
		"timezone": "UTC+03:00",
		"created": "1684721020944",
		"expiry": {
			"period": 30,
			"type": "MINUTE"
		},
		"asynchronous": false,
		"amount": 1.00,
		"currency": "SAR"
	},
	"reference": {
		"track": "tck_TS06A4220230203r0MP2205147",
		"payment": "4222230203051476421",
		"gateway": "123456789",
		"acquirer": "314123157811",
		"transaction": "txnss_0001",
		"order": "ord_0001&&&"
	},
	"response": {
		"code": "000",
		"message": "Captured"
	},
	"acquirer": {
		"response": {
			"code": "00",
			"message": "Approved"
		}
	},
	"gateway": {
		"response": {
			"code": "0",
			"message": "Transaction Approved"
		}
	},
	"card": {
		"object": "card",
		"first_six": "446404",
		"scheme": "MADA",
		"brand": "VISA",
		"last_four": "0007"
	},
	"receipt": {
		"id": "204222230203054620",
		"email": false,
		"sms": true
	},
	"customer": {
		"id": "cus_TS01A0520231538Ps321805785",
		"first_name": "test23",
		"middle_name": "test",
		"last_name": "test",
		"email": "tes2t1234@test.com",
		"phone": {
			"country_code": "965",
			"number": "00000000"
		}
	},
	"merchant": {
		"country": "SA",
		"currency": "SAR",
		"id": "1201232"
	},
	"source": {
		"object": "token",
		"type": "CARD_NOT_PRESENT",
		"payment_type": "DEBIT",
		"payment_method": "VISA",
		"channel": "INTERNET",
		"id": "tok_ex6t5523232urdf21fu44961"
	},
	"redirect": {
		"status": "PENDING",
		"url": "https://bfc-test.com"
	},
	"post": {
		"status": "PENDING",
		"url": "https://posturl"
	},
	"activities": [
		{
			"id": "activity_TS06A4220230203Rn032205241",
			"object": "activity",
			"created": 1684721020944,
			"status": "INITIATED",
			"currency": "SAR",
			"amount": 1.00,
			"remarks": "charge - created"
		},
		{
			"id": "activity_TS06A4320230203j4LH2205408",
			"object": "activity",
			"created": 1684721023408,
			"status": "CAPTURED",
			"currency": "SAR",
			"amount": 1.00,
			"remarks": "charge - captured"
		}
	],
	"auto_reversed": false,
	"payment_agreement": {
		"id": "payment_agreement_TS05A1920230911b2K12105431",
		"total_payments_count": 3,
		"contract": {
			"id": "card_gv7U4235591d8l21OQ4u663",
			"type": "UNSCHEDULED"
		},
		"variable_amount": {
			"id": "variable_amount_TS05A1920230911Hr2i2105431"
		}
	}
}


The response from the charge request provides important information about the transaction and the associated payment agreement.

Here are the key details:

Parameter	Description	Example
id	The unique identifier for the charge transaction.	
customer_initiated	Indicates whether the transaction was customer-initiated (in this case, it is set to false).
status: Indicates the status of the charge, which in this case is set to "CAPTURED," indicating a successful transaction.	
status	Indicates the status of the charge, which in this case is set to "CAPTURED," indicating a successful transaction.	
amount and currency	The amount and currency of the transaction (1.00 SAR).	
threeDSecure and card_threeDSecure	Both are set to false, indicating that the 3D Secure authentication process was skipped for this charge.	
save_card	Indicates whether the card details were saved for future use (in this case, it is set to false).	
customer	Provides details about the customer associated with the transaction, including their ID, name, email, and phone number.	
source	Contains information about the payment source, such as the token type (CARD_NOT_PRESENT), payment type (CREDIT), payment method (VISA), and channel (INTERNET).	
redirect and post	Contains the status and URLs for redirection and post-transaction processing, respectively.	
payment_agreement	Contains details about the payment agreement associated with the transaction, including the agreement ID, total payments count, and the contract type (UNSCHEDULED).	

Updated about 1 year ago

Creating Payment Agreement
Liability Shift: Customer vs Merchant
Did this page help you?
Yes
No
TABLE OF CONTENTS
Creating a Non-3D Secure Charge with a Payment Agreement
How to Create a Charge Using a Payment Agreement: Understanding Request Parameters and Process
Charge Response with Payment Agreement Created

URL: https://developers.tap.company/docs/omannet

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Cards
Google Pay
OmanNet
Benefit
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
OmanNet

Streamlining Secure Payments with OmanNet Integration

OmanNet allows customers to perform online payments using a OmanNet debit card.

OmanNet Integration

You can integrate the OmanNet payment method into your website and mobile app through Tap in two ways:

Utilizing our Web Card SDK and Mobile SDKs for a smooth in-app payment flow.
Redirecting users to the Tap hosted payment page.
📘

In order to enable OmanNet on your Tap account, please make sure to contact your account manager or contact us at support@tap.company

Accept OmanNet Cards in Embedded SDKs

The recommended option is usually using our SDKs for both web and mobile to accept OmanNet Debit cards. The Tap SDKs, will tokenize the OmanNet card submitted.

For example you can use our Web Card SDKs, either V1 or V2 for this integration.
Once you enable the SDK to accept debit cards, your customers can enter their OmanNet card details directly into the SDK, which securely tokenizes the card information.

To complete the payment and deduct the amount from the customer, make sure to pass the token generated (within 5 minutes of creating it), to the source.id field of our create a charge API endpoint, ensuring the currency is set to OMR. Upon calling the API, the payment will have a status of INITIATED. You will then need to open the transaction.url from the charge response in a browser, where the customer can enter the OTP sent to their phone number to complete the payment.



❗️

OmanNet only supports payments in OMR

Redirect to Tap Hosted Payment Page

If you are not using our SDKs but rather completing the integration solely with APIs, you can use the Tap Hosted payment page and only allow the OmanNet payment method to be available for the customer to complete his transaction. This approach works for both web and mobile integrations as well, allowing customers to enter their OmanNet card details in the Tap Hosted page, verify the payment with a OTP sent to their phone, and complete the transaction.

This option can be done by calling our create a charge API and passing in the source.id field the value src_omannet. Similar to the first option, the payment after calling the charge API, will have a status of INITIATED in the response and you will then need to open the transaction.url from the charge response in a browser, where the customer can enter their OTP to finalize the transaction.

Below is a sample of the charge API request/response to follow in order to achieve the redirection to Tap hosted page with only OmanNet as the available payment method.

Charge API Request

Make sure to call the create a charge API and pass the correct source as well as using currency OMR only.

JSON
{
...
	"currency": "OMR",
	"source": {
		"id": "src_omannet"
}
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-9f14407b3bbd"
 },
 "redirect": {
    "url": "https://customer.redirection_url"
  }
...
}

Charge API Response

A transaction URL is expected in the API response details. This will redirect the customer to the Tap Hosted Payment Page once you open it a browser/webview.

JSON
{
...
"id": "chg_TS05A1320231018Hy56070XXXX",
"status": "INITIATED",
"transaction": {  
	 "timezone": "UTC+03:00",  
	 "created": "1671563769240",  
	 "url": "<https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=d6aPjTalvIV0O3i8B2ED7hkBbPL8PY%2fzEY%3d">,

 "expiry": {  
 	"period": 30,  
	 "type": "MINUTE"  
	  },  
...
}

Accept OmanNet in Tap Hosted Payment Page Sample

In the image below, you can see how the customer can accept OmanNet cards in the Tap Hosted Payment page.

Webhook for Final Charge Response

After the customer completes his payment with OmanNet in either of the options mentioned above, the final charge response with the updated status of the payment, can be viewed using webhook or using the retrieve charge API.

Please refer to the below expected charge response sample.

JSON
{
    "id": "chg_TS07A2520241510KgXXXX",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "GET",
    "status": "CAPTURED",
    "amount": 4.123,
    "currency": "OMR",
    "threeDSecure": false,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "7210055701315195",
    "product": "GOSELL",
    "description": "",
    "transaction": {
        "authorization_id": "052279",
        "timezone": "UTC+03:00",
        "created": "1723821025023",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 4.13,
        "currency": "OMR"
    },
    "reference": {
        "track": "tck_TS05A4520241509Pp2XXXX",
        "payment": "2616241510085XXXX",
        "trace_id": "123456789XXXX",
        "transaction": "298079370500",
        "order": "7210055701315195",
        "acquirer": "422912052279",
        "gateway": "123456789012345"
    },
    "response": {
        "code": "000",
        "message": "Captured"
    },
    "security": {
        "threeDSecure": {
            "status": "Y"
        }
    },
    "acquirer": {
        "response": {
            "code": "00",
            "message": "Approved"
        }
    },
    "gateway": {
        "response": {
            "code": "0",
            "message": "Transaction Approved"
        }
    },
    "card": {
        "object": "card",
        "first_six": "422823",
        "first_eight": "42282300",
        "scheme": "OMANNET",
        "brand": "OMANNET",
        "last_four": "0001"
    },
    "receipt": {
        "id": "202616241510088210",
        "email": true,
        "sms": true
    },
    "customer": {
        "id": "cus_TS04A4520241509Jp2XXXX",
        "first_name": "Test Payer",
        "email": "testPayer@payment.com",
        "phone": {
            "country_code": "965",
            "number": "50000000"
        }
    },
    "merchant": {
        "country": "OM",
        "currency": "OMR",
        "id": "2777XXXX"
    },
    "source": {
        "object": "token",
        "type": "CARD_NOT_PRESENT",
        "payment_type": "DEBIT",
        "channel": "INTERNET",
        "id": "tok_jFc3724911eOGu12XXXX",
        "on_file": false,
        "payment_method": "OMANNET"
    },
    "activities": [
        {
            "id": "activity_TS04A2720241510m2R21608572",
            "object": "activity",
            "created": 1723821025023,
            "status": "INITIATED",
            "currency": "OMR",
            "amount": 4.123,
            "remarks": "charge - created",
            "txn_id": "chg_TS07A2520241510KgXXXX"
        },
        {
            "id": "activity_TS02A2820241510n2H31608853",
            "object": "activity",
            "created": 1723821028853,
            "status": "CAPTURED",
            "currency": "OMR",
            "amount": 4.13,
            "remarks": "charge - captured",
            "txn_id": "chg_TS07A2520241510KgXXXX"
        }
    ],
    "auto_reversed": false
}


Updated 5 months ago

Google Pay
Benefit
Did this page help you?
Yes
No
TABLE OF CONTENTS
OmanNet Integration
Accept OmanNet Cards in Embedded SDKs
Redirect to Tap Hosted Payment Page
Webhook for Final Charge Response

URL: https://developers.tap.company/docs/marketplace-onboarding-businesses

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Onboarding Businesses

The structure of Tap's Marketplace model is built on Destinations, each Business under your Marketplace should have a destination_id. This page guides you through creating a destination_id by onboarding your Businesses.

📘

For onboarding steps described on this page, you need to use the Marketplace Keys provided by Tap.




Step 1: Uploading KYC documents

Before you begin, you need to identify the Business's entity type. Tap supports two types of entities:

Corporate
Individual

You need to provide the required KYC documents, in order to get approval for your Business's account. The minimum KYC requirements depend on the entity type and the country of the Business. You are able to get the KYC requirements from your Account Manager.

For each document, you need to make a File API request. You'll receive a file_id for each file you upload, which you'll use in creating a business.

Create a File
curl --location --request POST 'https://api.tap.company/v2/files' \
--header 'Authorization: Bearer sk_test_BPmcTgEfuK1dHslMaLGY42Ry' \
--header 'Content-Type: multipart/form-data' \
--header 'content-type: multipart/form-data; boundary=---011000010111000001101001' \
--form 'file=""' \
--form 'purpose="identity_document"' \
--form 'title="Commercial License "' \
--form 'expires_at="1913743462"' \
--form 'file_link_create="true"'

Response
{
  "id": "file_641212279714869248",
  "object": "file",
  "live_mode": false,
  "api_version": "1.0",
  "feature_version": "1.0",
  "created": 1572947320,
  "filename": "8801760e0a28ae2105e4ada503e30b8c.jpg",
  "purpose": "identity_document",
  "size": 346827,
  "title": "test",
  "type": "jpg",
  "url": "/files/file_641212279714869248",
  "links": [
    {
      "id": "link_641212281036075008",
      "object": "file_link",
      "live_mode": true,
      "api_version": "1.0",
      "feature_version": "1.0",
      "created": 1572947320,
      "expired": false,
      "expires_at": 1234567,
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "url": "/links/fl_test_641212281036075009"
    }
  ]
}





Step 2: Creating a Business

After uploading all KYC documents, you need to make a businessrequest in order to generate adestination _id` for your Business.

Specify the type based on your Business entity type. If it is a licensed business set type to "corp", otherwise set it to "indv".
legal_name should be the same as the Business name on the commercial registration or license.
Specify the sector of your Business, you can choose the suitable sector after connecting with your Account Manager.
In the images object, specify the file_id you received in the first step.
JSON
"images": [
    "file_656840219076980736",
    "file_656840219076980736"
]

Create a Business
curl --request POST \
  --url https://api.tap.company/v2/business \
  --header 'authorization: Bearer sk_test_BPmcTgEfuK1dHslMaLGY42Ry' \
  --header 'content-type: application/json' \
  --data '
  {
  "name": {
    "en": "Flexwares",
    "ar": " تاپ للدفع"
  },
  "type": "corp",
  "entity": {
    "legal_name": {
      "en": "Flexwares",
      "ar": "فلكس ويرزدفع"
    },
    "is_licensed": true,
    "license_number": "2134342SE",
    "not_for_profit": false,
    "country": "KW",
    "settlement_by": "Acquirer",
    "documents": [
      {
        "type": "Commercial Registration",
        "number": "1234567890",
        "issuing_country": "SA",
        "issuing_date": "2019-07-09",
        "expiry_date": "2021-07-09",
        "images": [
          "file_656840219076980736"
        ]
      },
      {
        "type": "Commercial license",
        "number": "1234567890",
        "issuing_country": "SA",
        "issuing_date": "2019-07-09",
        "expiry_date": "2021-07-09",
        "images": [
          "file_656840219076980736"
        ]
      },
      {
        "type": "Trademark Document",
        "number": "1234567890",
        "issuing_country": "SA",
        "issuing_date": "2019-07-09",
        "expiry_date": "2021-07-09",
        "images": [
          "file_656840219076980736"
        ],
        "files": [
          "file_656840219076980736"
        ]
      }
    ],
    "bank_account": {
      "iban": "INBNK00045545555555555555"
    }
  },
  "contact_person": {
    "name": {
      "title": "Mr",
      "first": "Muhammed",
      "middle": "L",
      "last": "Fazan"
    },
    "contact_info": {
      "primary": {
        "email": "mfaz@fexwares.company",
        "phone": {
          "country_code": "965",
          "number": "900000"
        }
      }
    },
    "is_authorized": true,
    "identification": [
      {
        "type": "Identity Card",
        "issuing_country": "SA",
        "issuing_date": "2019-07-09",
        "expiry_date": "2020-07-09",
        "images": [
          "file_656840219076980736",
          "file_656840219076980736"
        ]
      },
      {
        "type": "Passport",
        "issuing_country": "SA",
        "issuing_date": "2012-07-09",
        "expiry_date": "2022-07-09",
        "images": [
          "file_656840219076980736",
          "file_656840219076980736"
        ]
      }
    ]
  },
  "brands": [
    {
      "name": {
        "en": "flexwareTip",
        "ar": "فلكس ويرز ت"
      },
      "sector": [
        "Sec 1",
        "Sec 2"
      ],
      "website": "https://www.flexwares.company/",
      "social": [
        "https://twitter.com/flexwares",
        "https://www.linkedin.com/company/flexwares/"
      ],
      "logo": "file_656840219076980736",
      "content": {
        "tag_line": {
          "en": "Walk free",
          "ar": "المشي الحرتروني",
          "zh": "自由走"
        },
        "about": {
          "en": "The Flexwares is a shoe store company selling awsome and long lasting shoes. Come and check out our products online. ",
          "ar": "هذه هي شركة لبيع الأحذية تبيع أحذية رهيبة وطويلة الأمد. تعال وتحقق من منتجاتنا عبر الإنتر",
          "zh": "这是一家鞋店公司，销售长久耐用的鞋子。快来在线查看我们的产品。"
        }
      }
    }
  ],
  "post": {
    "url": "http://flexwares.company/post_url"
  },
  "metadata": {
    "mtd": "metadata"
  }
}
  '

Response
{
  "id": "bus_cGTwK2120921MnyG22ps0o754",
  "status": "Active",
  "created": 1579684891457,
  "object": "business",
    
  ...
  
  "name": {
    "ar": " تاپ للدفع",
    "en": "Flexwares"
  },
  "type": "corp",
  
  ...
  
  "entity": {
    "id": "ent_cnTwK2120921iX7822E20W754",
    "status": "Active",
    "created": 1579684888483,
    "legal_name": {
      "ar": "فلكس ويرزدفع",
      "en": "Flexwares"
    },
      
  ...
  
	}
  
  ...
  
  "destination_id": "8302217348"
}


In the response of \business request, you will receive a destination_id. Save the destination_id, this is the ID you will use to process the Business's transactions.




Business account approval

The KYC verification process will be carried out by our team prior to the account approval. If any required KYC document is missing, or more information is need, our team will reach out to you.




See also
Split Payments

Split the amount at the time of the transaction

After Payments

Updated over 1 year ago

Getting Started
Split Payments
Did this page help you?
Yes
No
TABLE OF CONTENTS
Step 1: Uploading KYC documents
Step 2: Creating a Business
Business account approval
See also

URL: https://developers.tap.company/docs/marketplace-overview

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Overview

Tap Marketplace solution allows you to accept and split payments instantly with multiple businesses operating under a Marketplace in a seamless and automated way, as well as managing payouts to the Business's bank accounts.

📘

Business: Vendor/service provider registered under a Marketplace. Each Business under a Marketplace will be issued a unique destination_id.

With Tap Marketplace solution you can:

Onboard businesses: Onboard your businesses and create Tap's accounts for them seamlessly using our APIs.
Process payments: Split funds between multiple Businesses, and specify your marketplace fees on each transaction.
Transfer funds: Transfer funds between your marketplace and Businesses.
Payout: Payout Businesses quickly and reduce operational costs with Tap’s payout engine.
Reconcile: Simplify reconciliation by using our reconciliation dashboards, APIs, and customized reporting tools.

Updated over 1 year ago

Redirect
Getting Started
Did this page help you?
Yes
No

URL: https://developers.tap.company/docs/payment-agreement

ACCEPTANCE
Saved Cards
Payment Agreement and Contracts
Creating Payment Agreement
Merchant Initiated Transaction
Liability Shift: Customer vs Merchant
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Payment Agreement and Contracts

Tap Payments provides a streamlined process for transactions using saved cards, allowing merchants to store customer cards under specific payment agreements. These agreements permit the storage of cards with 3D Secure enabled and later, to charge the customer without requiring 3D Secure, adhering to the agreed-upon terms. This guide offers a comprehensive overview of this process, detailing the types of agreements available and the implementation plan for this feature.

Payment Agreement

A payment agreement is a mutual arrangement between the merchant and the customer that authorizes the merchant to carry out transactions on the customer's card. This arrangement facilitates more flexible transactions with saved cards while maintaining security measures that protect against unauthorized use. The use of a saved card necessitates clear consent from the customer, defined within the payment agreement terms, thus authorizing the merchant to make charges per the agreed terms using the saved card.

There are five contract types available for establishing customer payment agreements:

Card Contract - Payment Agreement

This agreement allows for flexibility and openness, enabling merchants to utilize the saved card for any purpose as defined by the merchant.

Example: A customer agrees to save their card details with a merchant to facilitate future purchases without completing the entire payment process. As per their agreement, the merchant can charge the customer for various goods or services.

Subscription Contract - Payment Agreement

This agreement enables the merchant to save the card exclusively for use within a specific subscription. The charged amount remains fixed and tied to the subscription.

Example: A customer subscribes to a monthly plan for a streaming service. Under a subscription contract, the merchant saves the customer's card details and automatically charges the fixed subscription fee to the customer's card each month.

Installment Contract - Payment Agreement

This agreement applies when customers choose to make payments in installments. The charged amount remains fixed and corresponds to the installment plan.

Example: A customer purchases a high-value item and opts to pay in installments. The merchant saves the customer's card details under an installment contract and charges the agreed-upon installment amount at regular intervals until the full payment is completed.

Milestone Contract - Payment Agreement

This agreement links payments to the completion of specific milestones or services. The charged amount varies and depends on the achieved milestones.

Example: A customer hires a contractor for a home renovation project. The merchant saves the customer's card details under a milestone contract and charges the customer after the completion of each defined milestone.

Order Contract - Payment Agreement

The order contract represents a unique type of payment agreement, allowing the merchant to charge the customer after delivering goods or services. Instead of the usual authorize-capture process, this agreement enables the merchant to charge the customer at any time based on dispatched items. The charged amount varies and aligns with the dispatched items.

Example: A customer places an order for various items from an online store. The merchant saves the customer's card details under an order contract. As the merchant ships the items, they charge the customer's card for the corresponding amount of the dispatched items.

Updated about 1 year ago

Saved Cards
Creating Payment Agreement
Did this page help you?
Yes
No
TABLE OF CONTENTS
Payment Agreement
Card Contract - Payment Agreement
Subscription Contract - Payment Agreement
Installment Contract - Payment Agreement
Milestone Contract - Payment Agreement
Order Contract - Payment Agreement

URL: https://developers.tap.company/docs/benefitpay-sdk-reactnative

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Web
iOS
Android
React-Native
Flutter
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
React-Native

Integrating React-Native BenefitPay SDK in your application

Introduction

Before diving into the development process, it's essential to establish the prerequisites and criteria necessary for a successful build. In this step, we'll outline the specific requirements, including the minimum SDK version and other important details you need to consider. Let's ensure your project is set up for success from the very beginning.

Sample demo


Step 1: Requirements
React native 0.64
A minimum Android SDK/API level of 24+
In order to accept online payments on your application, you will need to add at least the Internet permission in the manifest file.
D
<uses-permission android:name="android.permission.INTERNET" /> 
//get internet access to complete online payments

Step 2: Get Your Public Keys

While you can certainly use the sandbox keys available within our sample app which you can get by following the installation process, however, we highly recommend visiting our onboarding page, there you'll have the opportunity to register your package name and acquire your essential Tap Key for activating Card integration.

Step 3: Installation

We got you covered, benefit-pay-react-native can be installed with all possible technologies.

Node modules
D
npm install benefit-pay-react-native

D
yarn install benefit-pay-react-native


Then run in your terminal

D
cd ios
pod install
pod update

Import the dependency
D
import BenefitPayView from ‘benefit-pay-react-native’;

Step 4: Integrating Benefit-pay-react-native

This integration offers a simple integration designed for rapid development and streamlined merchant requirements.

Integration Flow

Here, you'll discover a comprehensive table featuring the parameters applicable to the simple integration. Additionally, you'll explore the various methods for integrating the SDK, either using storyboard to create the layout and then implementing the controllers functionalities by code, or directly using code. Furthermore, you'll gain insights into card tokenization after the initial payment and learn how to receive the callback notifications.

Parameters

Each parameter is linked to the Parameters Reference section, which provides a more in depth explanation of it.

Configuration	Description	Required	Type	Sample
operator	This is the Key that you will get after registering you bundle id.	True	String	let operator {publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7', hashString:''}
Transaction	amount and currency to generate a new transaction. It will be linked this token.	True	Transaction	let order: = { amount: 1, currency: TapCurrencyCode.SAR, description: '', id: '', , reference : ''}
Widget initialisation
D
function MinRequirement() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BenefitPayView
        onSuccess={(data) => {
          console.log(
            '🚀 ~ tokenValue:',
            data
          );
        }}
        onError={(data) => {
          console.log(
            '🚀 ~ onError:',
            data
          );
        }}
        style={{ width: '100%' }}
        config={{
          androidOperator: {
            hashString: '',
            publicKey: 'pk_live_********',
          },
          iOSOperator: {
            hashString: '',
            publicKey: 'pk_live_********',
          },
          merchant: {
            id: '',
          },
          transaction: {
            amount: 1,
            currency: TapCurrencyCode.BHD,
          },
          customer: {
            id:"",
            name: [
              {
                first: 'Tap',
                lang: Locale.en,
                middle: 'Company',
                last: 'Payments',
              },
            ],
            contact: {
              phone: {
                number: '88888888',
                countryCode: '+965',
              },
              email: 'tappayments@tap.company',
            },
          },
        }}
        onReady={() => {
          console.log(
            '🚀 ~ file: HomeScreen.tsx:145 ~ HomeScreen ~ onReady:',
          );
        }}
      />
    </View>
  );
}

Parameters Reference

Below you will find more details about each parameter shared in the above tables that will help you easily integrate BenefitPay-React-Native SDK.

Parameter	Description	Required	Type	Fields	Sample
operator	It links the payment gateway to your merchant account with Tap, in order to know your business name, logo, etc...	True	string	publicKey
Definition:This is a unique public key that you will receive after creating an account with Tap which is considered a reference to identify you as a merchant. You will receive 2 public keys, one for sandbox/testing and another one for production.
hashString
Definition: It is an encrypted string that combines the sensitive details of your transaction to mitigate any fraud manipulations..	"operator": { "publicKey": "pk_test_HJN863LmO15EtDgo9cqK7sjS", "hashString": "" },
transaction	This defined the details of the order that you are trying to purchase, in which you need to specify some details like the reference, scope...	True	Dictionary	currency
Definition: The currency which is linked to the order being paid.
amount
Definition: The order amount to be paid by the customer.
Note: Minimum amount to be added is 0.1.	"transaction": { "amount": 1.0, "currency": "BHD", }
merchant	This defined the details of the order that you are trying to purchase, in which you need to specify some details like the id, amount, currency ...	True	Dictionary	id
Definition: Generated once your account with Tap is created, which is unique for every merchant.	const merchant = {id:""}
customer	Here, you will collect the information of the customer that is paying..	True	Dictionary	id
Definition: This is an optional field that you do not have before the charge is processed. But, after the charge, then you will receive the customer ID in the response which can be handled in the onSuccess callback function.
name
Definition: Full Name of the customer paying.
Fields:

1. lang
Definition: Language chosen to write the customer name.

2. first
Definition: Customer's first name.

3. middle
Definition: Customer's middle name.

4. last
Definition: Customer's last name.
contact
Definition: The customer's contact information like email address and phone number.
Note: The contact information has to either have the email address or the phone details of the customers or both but it should not be empty.
Fields:

5. email
Definition: Customer's email address
Note: The email is of type string.

6. phone
Definition: Customer's Phone number details
a. countryCode
b. number	"id": customerIdController.text, "names": const [ { "first": "TAP", "middle": "", "last": "PAYMENTS", "lang": "en", } ], "contact": const { "email": "[tap@tap.company](mailto:tap@tap.company) ", "phone": { "countryCode": "+965", "number": "88888888" } }, }, }
interface	This will help you control the layout (UI) of the payment form, like changing the theme light to dark, the language used (en or ar), ...	False	Dictionary	locale
Definition: The language of the pay button. Accepted values as of now are:
Possible Values:

- en(for english)

- ar(for arabic).edges
Definition: Control the edges of the payment form.
Possible Values:

- curved

- flat	"interface": { "locale": "en", "edges": "flat", }
post	Here you can pass the webhook URL you have, in order to receive notifications of the results of each Transaction happening on your application.	False	Dictionary	url
Definition: The webhook server's URL that you want to receive notifications on.	"post": const {"url": "http\://your_website.com/post_url"},
redirect	Redirection Url.	False	String		const redirect: 'tapredirectionwebsdk://'
metadata	transaction meta data.	False	String		const metadata: 'metadata'
BenefitPayView Callbacks

callbacks that allows integrators to get notified from events fired from the BenefitPayView.

D
{
  ///  Will be fired whenever there is an error related to the button connectivity or apis
  ///  - Parameter  data: includes a JSON format for the error description and error
  const onError = (data: String) => {}
	///  Will be fired whenever the charge is completed, regardless of its status.
	///  - Parameter  data: includes a JSON format for the charge details
  const onSuccess = (data: String) => {}
	///  Will be fired whenever the order is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: Order id.
  const onOrderCreated = (data: String)  => {}
	///  Will be fired whenever the charge is created. use it, if you want to retrieve its data from your backend for state manegement purposes
	///  - Parameter  data: json data representing the charge model.
  const onChargeCreated = (data: String)  => {}
  ///  Will be fired whenever the benefit pay button is rendered and loaded
  const onReady = ()  => {}
  ///  Will be fired whenever the customer clicked on the benefit pay button. Now the button will be in loading state to render the benefit pay popup
  const onClicked = ()  => {}
  ///  Will be fired whenever the customer cancels the payment. This will reload the button once again
  func onCanceled = () => {}

}

Expected Callbacks Responses
onError
D
{
    "error":""
}

onOrderCreated
D
"ord_uAx145231127yHYS19Ou9B126"

onChargeCreated
D
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "CREATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

onSuccess
D
{
    "id": "chg_TS07A5220231433Ql241910314",
    "object": "charge",
    "live_mode": false,
    "customer_initiated": true,
    "api_version": "V2",
    "method": "UPDATE",
    "status": "INITIATED",
    "amount": 0.1,
    "currency": "BHD",
    "threeDSecure": true,
    "card_threeDSecure": false,
    "save_card": false,
    "order_id": "ord_uAx145231127yHYS19Ou9B126",
    "product": "GOSELL",
    "description": "",
    "order": {
        "id": "ord_uAx145231127yHYS19Ou9B126"
    },
    "transaction": {
        "timezone": "UTC+03:00",
        "created": "1697726033236",
        "url": "https://sandbox.payments.tap.company/test_gosell/v2/payment/tap_process.aspx?chg=8D9e9fdEo5N03hWrGnROvEEFw4DfqYVFv8R7R34GITc%3d",
        "expiry": {
            "period": 30,
            "type": "MINUTE"
        },
        "asynchronous": false,
        "amount": 0.1,
        "currency": "BHD"
    },
    "response": {
        "code": "100",
        "message": "Initiated"
    },
    "receipt": {
        "email": true,
        "sms": true
    },
    "customer": {
        "first_name": "TAP",
        "last_name": "PAYMENTS",
        "email": "tap@tap.company",
        "phone": {
            "country_code": " 965",
            "number": "88888888"
        }
    },
    "merchant": {
        "country": "KW",
        "currency": "KWD",
        "id": "599424"
    },
    "source": {
        "object": "source",
        "id": "src_benefit_pay"
    },
    "redirect": {
        "status": "PENDING",
        "url": ""
    },
    "post": {
        "status": "PENDING",
        "url": ""
    },
    "activities": [
        {
            "id": "activity_TS02A5420231433Mx4g1910470",
            "object": "activity",
            "created": 1697726033236,
            "status": "INITIATED",
            "currency": "BHD",
            "amount": 0.1,
            "remarks": "charge - created"
        }
    ],
    "auto_reversed": false,
    "gateway_response": {
        "name": "BENEFITPAY",
        "request": {
            "amount": "0.100",
            "currency": "BHD",
            "hash": "gMjpC12Ffz+CMhyvm+/jdYJmqbPdgAhHJvvGBABYhCI=",
            "reference": {
                "transaction": "chg_TS07A5220231433Ql241910314"
            },
            "merchant": {
                "id": "00000101"
            },
            "application": {
                "id": "4530082749"
            },
            "configuration": {
                "show_result": "0",
                "hide_mobile_qr": "0",
                "frequency": {
                    "start": 120,
                    "interval": 60,
                    "count": 10,
                    "type": "SECOND"
                }
            }
        }
    }
}

Generate the hash string
Install crypto-js npm install crypto-js
Import
D
  import sha256 from 'crypto-js/sha256';  
  import hmacSHA256 from 'crypto-js/hmac-sha256';  
  import Base64 from 'crypto-js/enc-base64';

Copy this helper method code
D
/\*_  
     This is a helper method showing how can you generate a hash string when performing live charges  
     - Parameter publicKey:             The Tap public key for you as a merchant pk_.....  
     - Parameter secretKey:             The Tap secret key for you as a merchant sk_.....  
     - Parameter amount:                The amount you are passing to the SDK, ot the amount you used in the order if you created the order before.  
     - Parameter currency:              The currency code you are passing to the SDK, ot the currency code you used in the order if you created the order before. PS: It is the capital case of the 3 iso country code ex: SAR, KWD.  
     - Parameter post:                  The post url you are passing to the SDK, ot the post url you pass within the Charge API. If you are not using postUrl please pass it as empty string  
     - Parameter transactionReference:  The reference.trasnsaction you are passing to the SDK(not all SDKs supports this,) or the reference.trasnsaction  you pass within the Charge API. If you are not using reference.trasnsaction please pass it as empty string  
     _/  
      const generateTapHashString = (  
        publicKey: string,  
        secretKey: string,  
        amount: number,  
        currency: string,  
        postUrl: string = '',  
        transactionReference: string = ''  
      ) => {  
        // Let us generate our encryption key  
        // For amounts, you will need to make sure they are formatted in a way to have the correct number of decimal points. For BHD we need them to have 3 decimal points  
        const formattedAmount = amount.toFixed(3);  
        // Let us format the string that we will hash  
        const toBeHashed = 'x_publickey${publicKey}x_amount${formattedAmount}x_currency${currency}x_transaction${transactionReference}x_post${postUrl}';  
        // let us generate the hash string now using the HMAC SHA256 algorithm  
        const hashDigest = sha256(toBeHashed);  
        const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, secretKey));  
        return hmacDigest;  
      };

Call it as follows:
D
let hashString = generateTapHashString(publicKey: publicKey, secretKey: secretString, amount: amount, currency: currency, postUrl: postUrl)

Pass it within the operator model
D
let operatorModel = {publicKey: "pk_test_HJN863LmO15EtDgo9cqK7sjS", hashString: hashString}


Updated about 1 month ago

WHAT’S NEXT
react-native
ios
android
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Sample demo
Step 1: Requirements
Step 2: Get Your Public Keys
Step 3: Installation
Step 4: Integrating Benefit-pay-react-native
Integration Flow
Parameters Reference
Generate the hash string

URL: https://developers.tap.company/docs/recommendations-best-practices

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Recommendations & Best Practices

Integration Recommendations & Best Practices

Integration
For Acceptance, ensure that the charge ID is passed in the Charges API based on the type of policy
For Reconciliation purposes, ensure that the reference.order and reference.transaction are passed via API/SDK
For handling Duplicate charges, use reference.idempotent
For Webhook Notification, use post.urlwithin the API endpioints
For securing the Webhook Notification, use the hashstring calculation
For finding the status of the payment for displaying on the confirmation screen, use Retrieve a Charge at the point of redirection
Please process all refunds via API or Enterprise Dashboard
For customized user access management write to integrations@tap.company with required access
For faster checkout experience use the card sdk v1/v2 instead of charge API
Before going live
Ensure that your integration is thoroughly tested in sandbox and production
Request an Integration Review call with the Developer Experience team at tap
Ensure that the sk_live and pk_live keys are used
Ensure that the POST.URL and REDIRECT.URL are pointed to your production urls
Ensure that one live transaction is done for every payment method for all your integration channels (Web/Mob)
Ensure that you are able to view the transactions in the Enterprise Dashboard as well in your system
Post go live
Monitor the transactions using the Enterprise Dashboard
For Payout reports, use the payout API or Enterprise Dashboard

Updated 9 months ago

Authorize and Capture
Platforms Setups
Did this page help you?
Yes
No
TABLE OF CONTENTS
Integration
Before going live
Post go live

URL: https://developers.tap.company/docs/recurring-payments

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Recurring Payments

A Step-by-Step Documentation for Setting Up and Processing Recurring Payments

Recurring payments allow merchants to charge customers on a regular basis, such as for subscriptions or installment plans. This guide provides a detailed guide on setting up and processing recurring payments using Tap APIs. Please note that this guide assumes you have already familiarized yourself with the API reference documentation for Tap Payments, specifically the Charges API and Authorize API.

Step 1: Enable the Save Card Feature

First, ensure the Save Card feature is active on your account by contacting your Tap account manager. Activation allows you to store customer card details securely on Tap's system, providing you with Card ID, Customer ID, and Payment Agreement ID. Note: Full card details are not disclosed for security reasons.

To begin accepting recurring payments, the Save Card feature must be enabled on your merchant account. Contact your Tap account manager to request the activation of this feature. Once enabled, you will gain the ability to save customer card details on the Tap Payments platform. You will receive three important parameters: Card ID, Customer ID, and Payment Agreement ID. It's worth noting that the full raw card details will not be provided, as Tap ensures secure storage of card information.

Step 2: Saving Cards

There are two methods to save cards: during the first transaction or during the authorization process. Follow the instructions below:

a) Saving Cards During First Transaction:

When a customer makes their first transaction, you can save their card details by passing the save_card parameter as true in the Charges API. Refer to the Charges API documentation for further details on implementing this.

b) Saving Cards During Authorization:

Alternatively, you can authorize the card for a small amount and save the card during the authorization process. To achieve this, include the save_card=true parameter in the authorization request. Subsequently, you can release the authorized amount using the void authorize endpoint or set auto-void/auto-capture for a maximum period of 168 hours. For comprehensive instructions, consult the Authorize API reference documentation.

Step 3: Retrieving Card Details

Once a card is saved successfully, you can retrieve important card details for future reference. The card details retrieved will include:

Card ID
Creation timestamp
Live mode status
Customer ID
Funding type (e.g., CREDIT)
Card fingerprint
Card brand (e.g., VISA)
Card scheme (e.g., VISA)
Cardholder name
Expiration month
Expiration year
Last four digits of the card number
First six digits of the card number

Example Response

JSON
{
	"id": "card_CBLn1723121vxiX249U4R752",
	"created": 1684918877751,
	"object": "card",
	"live_mode": true,
	"address": {},
	"customer": "cus_LV02H3420231157Rw4e2405654",
	"funding": "CREDIT",
	"fingerprint": "H%2BB%2BTuqbTaggPAbfml9CDDJzLQUzActOhf1BnVF22TI%3D",
	"brand": "VISA",
	"scheme": "VISA",
	"name": "MIKITA",
	"exp_month": 1,
	"exp_year": 27,
	"last_four": "5925",
	"first_six": "418887"
}

📘

Note: It's essential to highlight that saving cards does not require PCI compliance on your end. All card details are securely stored in Tap Payments' PCI environment. Tap provides card SDKs for both web and mobile platforms, ensuring the secure collection of cardholder data during integration. The card data is encrypted, and a secure token is generated for authorization.

Step 4: First Transaction and 3D Secure Process

When cards are saved, the first transaction performed using the saved card will undergo a 3D Secure process. This process enhances the security of the transaction and protects against fraudulent activity.

Step 5: Starting Recurring Payments

To initiate recurring payments, you need to store three essential parameters in your database: Customer ID, Card ID, and Payment Agreement ID. These parameters will be used in subsequent transactions for recurring charges. Here's how to generate a fresh token for recurring payments:

Utilize the Token API to generate a token from the saved card. This token will serve as a reference for future charges.

🚧

Note: Tokens are one-time use and expire after 5 minutes. It's crucial to generate a new token for each recurring payment.

Step 6: Initiating Recurring Payments - Non-3DS Transaction

Perform the following steps to initiate a recurring payment as a non-3DS transaction:

Use the generated token within the source.id field of the Charges API.
Set customer_initiated to false to indicate a merchant-initiated transaction.
Include the Payment Agreement ID generated during the card-saving process in the Charges/Authorize API.
🚧

Note: A non-3DS transaction cannot be initiated without a valid Payment Agreement ID.

Step 7: Complete Charge Request Example

Below is an example of a complete Charge Request for a recurring payment, including all the necessary parameters:

cURL
curl --request POST \
     --url https://api.tap.company/v2/charges \
     --header 'Authorization: Bearer sk_test_WTcOpytQHIS1kdhw24avuG3C' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "amount": 1,
  "currency": "KWD",
  "customer_initiated": false,
  "save_card": false,
  "payment_agreement": {
    "id": "payment_agreement_TS07A4620230032t4K21406294"
  },
  "description": "Test Description",
  "metadata": {
    "udf1": "Metadata 1"
  },
  "reference": {
    "transaction": "txn_01",
    "order": "ord_01"
  },
  "receipt": {
    "email": true,
    "sms": true
  },
  "customer": {
    "first_name": "test",
    "middle_name": "test",
    "last_name": "test",
    "email": "test@test.com",
    "phone": {
      "country_code": 965,
      "number": 51234567
    },
    "id": "cus_TS01A4620230032p4KP1406279"
  },
  "source": {
    "id": "tok_2uKe58232153ZmxV138r5c637"
  },
  "post": {
    "url": "http://your_website.com/post_url"
  },
  "redirect": {
    "url": "http://your_website.com/redirect_url"
  }
}
'

🚧

Note: Remember that for merchant-initiated transactions, the liability lies with the merchant, while for customer-initiated transactions, the liability rests with the payer.

Best Practices:

To ensure a seamless experience and accurate tracking of recurring payments, consider the following best practices:

👍

Use a consistent Customer ID for each customer.

Tap generates a unique Customer ID when customer information is passed through the Charges/Authorize API. Save this ID for future use. If required, utilize the Tap Customer API to create a Customer ID proactively.

📘

Note: Recurring payments are not supported for certain local payment methods, such as KNET or benefit. Refer to the respective payment method documentation for further information.

This comprehensive guide has provided you with step-by-step instructions on setting up and processing recurring payments using Tap Payments. By following these guidelines, you can seamlessly integrate recurring payments into your business operations and enhance the customer experience. If you require further assistance or have specific inquiries, please consult the Tap Payments support team for personalized support.

Updated 9 months ago

Liability Shift: Customer vs Merchant
Web Card SDK V1
Did this page help you?
Yes
No
TABLE OF CONTENTS
Step 1: Enable the Save Card Feature
Step 2: Saving Cards
a) Saving Cards During First Transaction:
b) Saving Cards During Authorization:
Step 3: Retrieving Card Details
Step 4: First Transaction and 3D Secure Process
Step 5: Starting Recurring Payments
Step 6: Initiating Recurring Payments - Non-3DS Transaction
Step 7: Complete Charge Request Example
Best Practices:

URL: https://developers.tap.company/docs/redirect-payments-integration-flow

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Redirect Payments

Integration Flow (KNET-BENEFIT)

Step 1 - Create a Charge
Pass the correct Source
“src_kw.knet” for Knet
“src_bh.benefit” for Benefit
Pass the amount to Charge
KWD currency is required for Knet
BHD currency is required for Benefit
Pass Customer ID - (Required for KFast)
Pass the correct MID related to each country.
Pass the Redirect URL to redirect back after the Success Charge from the redirection Page
Pass the Post URL to pass the response after the Success Charge
Step 3 - Save the following details from the Charge Response for future transactions.
Charge ID
Charge Status

Updated over 1 year ago

Card Payments
Device Payments
Did this page help you?
Yes
No

URL: https://developers.tap.company/docs/redirect

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Redirect
Overview

This page guides you to initiate a single payment method using APIs and redirect flow. You can use it with any payment method supported by Tap.

📘

Redirect payment flow requires redirect_url in the API request. After payment is completed, the user will be redirected to this URL.




Step 1: Choose the payment method source

Each payment method has a specific source_id as follows:

src_card: Visa, MasterCard, AMEX, and mada
src_sa.mada: mada
src_kw.knet: KNET
src_bh.benefit: Benefit
src_om.omannet: Omannet
src_eg.fawry: Fawry
src_apple_pay: Apple-Pay

Choose the source_id of the payment method you want to initiate.




Step 2: Initiate a request

Make a \charge request, specifying the payment method source in the source.id.

JSON
"source": {
    "id": "src_kw.knet"
  },


Provide a redirect URL, where the user will be redirected after completing the transaction.

JSON
"redirect": {
    "url": "http://your_website.com/redirect_url"
  }





Step 3: Redirect user to the payment page

In the response of the \charge request, you'll receive a transaction.url containing a URL for the payment page.

JSON
"transaction": {
    "authorization_id": "348683",
    "timezone": "UTC+03.00",
    "created": "1234343434",
    "url": "https://url.com/payment_url"
  }


The user should be redirected to this URL, provide the required payment information, and complete the transaction.

📘

For KNET and Benefit, the URL will contains a direct link to KNET and Benefit page respectively.




Step 4: Retrieve the transaction

When the user is redirected to your redirect_url, you'll receive tap_id. Make a \charge request to retrieve the transaction details, specifying the charge_id contained in tap_id.

Retrieve a Charge
curl --request GET \
  --url https://api.tap.company/v2/charges/chg_TS020420211019Ja242609987 \
  --header 'authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
  --data '{}'

Response
{ "id": "chg_TS020420211019Ja242609987", 
  "object": "charge", 
  "live_mode": false, 
  "api_version": "V2", 
  "method": "GET", 
  "status": "CANCELLED", 
  "amount": 1.000, 
  "currency": "BHD", 
  "threeDSecure": true, 
  "card_threeDSecure": false, 
  "save_card": false, 
  "merchant_id": "", 
  "product": "", 
  "statement_descriptor": "Sample", 
  "description": "Test Description", 
  "metadata": { "udf1": "test 1", "udf2": "test 2" }, 
  "transaction": { 
      "timezone": "UTC+03:00", 
      "created": "1632651545003", 
      "expiry": { "period": 30, "type": "MINUTE" }, 
      "asynchronous": false, 
      "amount": 1.000, 
      "currency": "BHD" 
  }, 
  "reference": { 
      "id": "ref_BoajZCHlFDnLsUbyBygLkB", 
      "track": "tck_TS030520211019Yx942609049", 
      "payment": "5726211019090490134", 
      "gateway": "00", 
      "transaction": "txn_0001", 
      "order": "ord_0001" 
  }, 
  "response": { 
      "code": "302", 
      "message": "Cancelled" 
  }, 
  "receipt": { "id": "205026211019099018", "email": false, "sms": true }, "customer": { "first_name": "test", "middle_name": "test", "last_name": "test", "email": "test@test.com", "phone": { "country_code": "965", "number": "50000000" } }, "source": { "object": "source", "type": "CARD_NOT_PRESENT", "payment_type": "DEBIT", "payment_method": "BENEFIT", "channel": "INTERNET", "id": "src_bh.benefit" }, "redirect": { "status": "SUCCESS", "url": "https://noonera.com/demo/redirect.php" }, "post": { "status": "SUCCESS", "url": "https://noonera.com/demo/post.php" } }


Updated over 1 year ago

Webhook
Overview
Did this page help you?
Yes
No
TABLE OF CONTENTS
Overview
Step 1: Choose the payment method source
Step 2: Initiate a request
Step 3: Redirect user to the payment page
Step 4: Retrieve the transaction

URL: https://developers.tap.company/reference/remind-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Remind an Invoice
POST
https://api.tap.company/v2/invoices/{invoice_id}/remind
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
invoice_id
string
required

optional

RESPONSES
200

200

400

400

Updated over 1 year ago

Cancel an Invoice
Finalize an Invoice
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request POST \
2
     --url https://api.tap.company/v2/invoices/invoice_id/remind \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-card

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
Retrieve a Card
GET
Verify a Card
POST
Delete a Card
DELETE
List All Cards
GET
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Card
GET
https://api.tap.company/v2/card/{customer_id}/{card_id}

This endpoint can be used to retrieve details of cards saved under a customer. The 10 most recent cards directly linked to a customer or recipient are always visible

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
customer_id
string
required

The ID of the customer who the card is saved under.

card_id
string
required

The ID of the card to be retrieved.

RESPONSES
200

200

400

400

Updated about 1 year ago

Cards
Verify a Card
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/card/customer_id/card_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-charges

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Create a Charge
POST
Retrieve a Charge
GET
Update a Charge
PUT
List all Charges
POST
Download Charges
POST
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Charge
GET
https://api.tap.company/v2/charges/{charge_id}

This endpoint retrieves the details of a charge that was previously created.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

Just supply the unique charge.id that was returned from your previous request, and Tap will return the corresponding charge information. The same information is returned to the post.url as raw JSON data.

Please review the Charge Response Model to get more info.

PATH PARAMS
charge_id
string
required

The unique charge.id that was returned from your previous charge request.

RESPONSE
200

200

Updated almost 2 years ago

Create a Charge
Update a Charge
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/charges/charge_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result

URL: https://developers.tap.company/reference/retrieve-a-customer

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Customer
GET
https://api.tap.company/v2/customers/{customer_id}

This endpoint retrieves a specified customer.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
customer_id
string
required

Unique identifier for the object.

RESPONSES
200

200

400

400

Updated almost 2 years ago

Create a Customer
Update a Customer
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/customers/customer_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-destination

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Retrieve a Destination
GET
List All Destinations
POST
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Destination
GET
https://api.tap.company/v2/destination/{destination_id}

This endpoint can be used to retrieve a destination.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
destination_id
string
required
Defaults to 5552612042

Unique identifier for the destination object.

RESPONSES
200

200

400

400

Updated 19 days ago

Destinations
List All Destinations
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/destination/5552612042 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: text/plain'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
text/plain
200 - Result
application/json
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-lead

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Create a Lead
POST
Retrieve a Lead
GET
Create a Connect URL
POST
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Lead
GET
https://api.tap.company/v3/connect/lead/{lead_id}

This endpoint retrieves the details of a lead that was previously created.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
lead_id
string
required
Defaults to led_xxxx

The ID of the Lead which needs to be retrieved.

RESPONSES
200

200

400

400

Updated 6 months ago

Create a Lead
Create a Connect URL
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v3/connect/lead/led_xxxx \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-refund

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
Create a Refund
POST
Retrieve a Refund
GET
Update a Refund
PUT
List All Refunds
POST
Download Refunds
POST
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Refund
GET
https://api.tap.company/v2/refunds/{refund_id}

This endpoint retrieves the details of an existing refund.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
refund_id
string
required

Unique identifier for the refund object.

RESPONSES
200

200

400

400

Updated over 1 year ago

Create a Refund
Update a Refund
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/refunds/refund_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-a-token

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Create a Token (Card)
POST
Create a Token (Encrypted Card)
POST
Create a Token (Saved Card)
POST
Create a Token (Apple Pay token)
POST
Create a Token (Samsungpay token)
POST
Retrieve a Token
GET
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve a Token
GET
https://api.tap.company/v2/tokens/{token_id}

This endpoint enables the retrieval of a specific Token ID, which is also provided in the Token response.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

You can utilize this Token ID in the Charge or Authorize API request, or you can also use it in the Create Card API to save the card for future charges or authorizations.

PATH PARAMS
token_id
string
required
Defaults to tok_o7EM58231043tTZT274u3W894

Unique identifier for the object.

RESPONSES
200

200

400

400

Updated almost 2 years ago

Create a Token (Samsungpay token)
Cards
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/tokens/tok_o7EM58231043tTZT274u3W894 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-an-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve an Authorize
GET
https://api.tap.company/v2/authorize/{authorize_id}

This endpoint retrieves the details of a previously authorized transaction.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.

Supply the unique Authorize ID that was returned from your previous request, and Tap will return the corresponding authorization information. The same information is also returned when creating the authorization.

PATH PARAMS
authorize_id
string
required
Defaults to auth_TS010720221114Hn5q2609463

The ID of the authorized transaction which need to be retrieved.

RESPONSES
200

200

400

400

Updated almost 2 years ago

Create an Authorize
Update an Authorize
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/authorize/auth_TS010720221114Hn5q2609463 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/retrieve-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Retrieve an Invoice
GET
https://api.tap.company/v2/invoices/{invoice_id}
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
invoice_id
string
required

optional

RESPONSES
200

200

400

400

Updated over 1 year ago

Create an Invoice
Update an Invoice
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request GET \
2
     --url https://api.tap.company/v2/invoices/invoice_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/samsung-pay-token

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Samsung Pay

Streamlining Secure Payments with Samsung Pay Direct Integration

Introduction to Samsung Pay

Samsung Pay is a mobile payment and digital wallet service by Samsung that lets users make payments using compatible phones and other Samsung-produced devices. Here is a step by step guide to integrate Samsung pay using Tap APIs.

Streamlining Secure Payments with Samsung Pay Direct Integration
Setup Samsung Pay Developer Account
Navigate to Samsung Pay Developers
Click on Sign In on the upper right corner
Login with your Samsung Account
Click on Dashboard
Fill out the business details; ensure the correct country is selected. KSA is
listed with the code name GCC.
Samsung team will approve the account within 2 business days.
Getting Samsung Pay CSR

Please contact integrations@tap.company to obtain the Samsung Pay CSR

Web and InApp Online Payment

The Samsung JS SDK verifies it is loaded on an approved domain name as configured by the merchant. Follow these steps to create the service:

From Samsung Pay Developers portal, click on Go and create inside the
Create new service box
Alternatively, hover on My projects then Click Go and Create within the Create New Service box
Select Web Online Payment or Select InApp Online Payment based on your need
Enter the service information
Service Name: an identifier for the merchant
Service Location: Ensure the correct country is selected (SA is listed under GCC in the country options).
Payment Gateway: you have to selected tappayments as payment gateway
CSR: The file shared with you from Tap's Integration team.


Creating a Samsung Pay Token

To integrate Samsung Pay into your payment system, you'll need to create and handle Samsung Pay tokens. Below is a step-by-step guide to creating a Samsung Pay token.

Initialize Samsung Pay

Ensure that Samsung Pay is properly set up on the user's device.

Generate Token Request

Create a token request payload in the specified format.

JSON
{  
    "type": "samsungpay",  
    "token_data": {  
        "data": "your_payload_from_samsung"  
    }  
}

Send Token Request

Send the token request to the Tap token endpoint.

Receive and Store Token

Receive the token response and process the payment using Charges API.

Sample Token Request Payload

Below is an example of a Samsung Pay token Curl request:

Tap Token - Samsung Pay
curl --request POST \
  --url https://api.tap.company/v2/tokens \
  --header 'authorization: Bearer sk_test_ltWcmEKnXQr4jaAD2UiPCfJ3' \
  --header 'content-type: application/json' \
  --data '{
	"type": "samsungpay",
	"token_data": {
		"data": "eyJhbGciOiJSUzI1NiIsImtpZCI6Im1ka29yYTd0cWVGb0hRNkluMXpabFQ5MTJBZ0I0bFExOStZRHNsVGUxNVU9IiwidHlwIjoiSk9TRSIsImN0eSI6IkpXRSJ9.ZXlKaGJHY2lPaUpTVTBFeFh6VWlMQ0pyYVdRaU9pSnRaR3R2Y21FM2RIRmxSbTlJVVRaSmJqRjZXbXhVT1RFeVFXZENOR3hSTVRrcldVUnpiRlJsTVRWVlBTSXNJblI1Y0NJNklrcFBVMFVpTENKamFHRnVibVZzVTJWamRYSnBkSGxEYjI1MFpYaDBJam9pVWxOQlgxQkxTU0lzSW1WdVl5STZJa0V4TWpoSFEwMGlmUS5GczRSaGZPZE0zQUtpUU9JcWwySDB0dWNTXzFyVWR2bVh5LWhDY3AxOU5SVWFKcE96S1ZROTVxQ1ZsREF6ektmZ1hQbHU0RWd5Y0t5cTd2bmNzN3BOempMU2Z4ajFpejhFb2JmcVFHQ2dPMjRoRG8zRDJyaE9kQTJTWVktVVRwWGRQR2s4OUQ3MFRQeTlZZzh1UnRyREFfMC0zVnRxYTlRZThmXzVGclA3UUpieTVKSUZyNm5jRXktT25EQlFRb3lQV3d6cnVNcUhXMlIzSjh0WHhCZkp1R2gydURFMkJrVVlfQzFjM3dwZzVIWkhXV01VajZjem5tM2RGWnhXSnhHR1VnTHFKOU5aV1NKcUtyeUtYQWpZMGFRdjVvbXFCaDNjZHZSTnBKaWU0NDF2dS1pODVISzRaSE5zajM1SjBzU1FjMW4zUmR6azJjaEt2UnJCLXkycFEub3VzcEJSalU5bDBOei00Wi5Lam04VC1ZYnp6NDJvX3Y5aXNlTk42eHRoX3BEYTRlTHItcWZaMFFVVkN5bHNleHVoUTJJSTBHbGg4VElIMTIyMXZpTFRNXzNlX3h4UnJVRTJKR3RLMjdPZlpTS2xheTRQdGZKRTIyd0hUTlV1ZDREbjN2T1ZmcFRNd1lxamVLU2IxS0xodzZtSVQ4WUVaaHlFa0dzY0RncFJzV1BGWE5IT1BZbnlDcVhTQ0s2cmpLNm9tdTduYmRUZzRhcGNmZjRiZk96c0lqTFpOdF9XbWh3S21MdG8xVXIxblB2bVFhUFpkVTAxYW9HRDNfNVN4MDU1Zy5mUVVCYWE5NW9HNi1CMDdIeUpwVkRB.Jp7cToKxDfkMeeIV5hddA3PDwtD35fp4cq56cwUhNsQQ9HI5O2ucYsz_BVf0q0efRYXMDK8jMSOWHxt75gX3rxdgAQSASPRfUZH7KQ9x-LUfhG-0MaoROMpQdW0df0gzrGL9J2bZQ1u8Sa06Aho_opat2bCalF9AzQS0ycCkzCBbqPIcrGS40ATlN6VCc48Bn1JTkoUbxo4x_JqDDI-OdqHJ7DTCQHMVLpQDpwbzR1lSz5qiz0i3jchdxGf3LfsnqKKGPMKD_q1qlRnBsoJ6ZF0sSMcvW8NbyMPiu-b5RZbz8S_kec35Pcf2rFjNxac3BsqFIVWwGC_e1Ib7YpDhEw"
	},
	"client_ip": "37.34.236.190"
}'

Detailed Description

type: Indicates the type of payment method. For Samsung Pay, use "samsungpay".
token_data: Contains the token details.
data: The actual token data provided by Samsung Pay.

API response

The API response includes a token_id and additional card details such as funding type, brand, expiration date, and more.

JSON
{
	"id": "tok_SyvF30241193Isu28y210n229",
	"status": "ACTIVE",
	"created": 1732792170229,
	"object": "token",
	"live_mode": false,
	"type": "SAMSUNGPAY",
	"purpose": "CHARGE",
	"used": false,
	"card": {
		"id": "card_8Tfu3024119ide228kh10v235",
		"object": "card",
		"on_file": false,
		"funding": "DEBIT",
		"fingerprint": "KdAa4VA7oIQyWx6NtBTDtt8p0sYYMugESUmNkDANru4%3D",
		"brand": "MASTERCARD",
		"scheme": "MASTERCARD",
		"category": "Visa Proprietary",
		"exp_month": 9,
		"exp_year": 27,
		"last_four": "1213",
		"first_six": "518573",
		"first_eight": "51857316",
		"name": "/",
		"issuer": {
			"country": "SA",
			"id": "bin_6c271124728d451b98f4d687119dfafd"
		}
	},
	"payment": {
		"id": "card_8Tfu3024119ide228kh10v235",
		"on_file": false,
		"card_data": {
			"exp_month": 9,
			"exp_year": 27,
			"last_four": "1213",
			"first_six": "518573",
			"first_eight": "51857316"
		},
		"fingerprint": "KdAa4VA7oIQyWx6NtBTDtt8p0sYYMugESUmNkDANru4%3D",
		"scheme": "MASTERCARD",
		"category": "Visa Proprietary",
		"issuer": {
			"country": "SA",
			"id": "bin_6c271124728d451b98f4d687119dfafd"
		}
	},
	"merchant": {
		"id": "12345"
	},
	"client_ip": "37.34.236.190"
}

Charge the Token

Sample to control the source object in the charge API: with token_id

JSON
{
	"amount": 1,
	"currency": "SAR",
	"reference": {
		"transaction": "merchant_reference",
		"order": "merchant_reference"
	},
	"customer": {
		"id": "tap_generated_customer_id"
	},
	"merchant": {
		"id": "your_merchant_id"
	},
	"source": {
		"id": "tok_CUBiv13xxxx2ZiYP5XXXXX"
	},
	"post": {
		"url": "https://yourwebsite.com/v1/payment/tappayment-webhook"
	},
	"redirect": {
		"url": "https://yourwebsite.com/v1/payment/confirmation_page"
	}
}


The API response will include the status captured, indicating that the payment was successfully processed.

Updated about 2 months ago

Overview of Payment Methods
Card Payments
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction to Samsung Pay
Streamlining Secure Payments with Samsung Pay Direct Integration
Setup Samsung Pay Developer Account
Getting Samsung Pay CSR
Web and InApp Online Payment
Creating a Samsung Pay Token
Sample Token Request Payload
API response
Charge the Token

URL: https://developers.tap.company/docs/saved-cards

ACCEPTANCE
Saved Cards
Payment Agreement and Contracts
Creating Payment Agreement
Merchant Initiated Transaction
Liability Shift: Customer vs Merchant
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Saved Cards

Discover how to save cards with Tap Payments to offer a seamless and quick checkout experience to your customers.

Before using the save cards feature, ensure that it is enabled on your account. If you don't have it enabled already, just contact our customer support team and they can enable it for you.

To save a card, create an Authorize, Charge, or Verify Card request and set the 3D Secure and save_card flags to true in the request body.
JSON request
{
  ...
  "threeDSecure": true,
  "save_card": true,
  ...
}

The transaction response will include the card ID, which contains card information such as the brand name, first six and last four digits of the card, and more.
Transaction Response
{
...
"card": {
    "id": "card_IQPXL3xxxxxxxxxxxxxxx",
    "object": "card",
    "first_six": "450875",
    "brand": "VISA",
    "last_four": "1019"
  },
...
}


(Note: You will not receive the card ID if the save cards feature is not enabled. The response through 'post_url' or 'redirect_url' contains the same details.)

Once you have the card ID, you can use it for various purposes, including charging returning customers, creating subscriptions, generating fresh tokens, and more.

Updated about 1 year ago

Payment Agreement and Contracts
Did this page help you?
Yes
No

URL: https://developers.tap.company/docs/marketplace-split-payments

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Split Payments

As a Marketplace, you can split the transaction amount among one or more Destinations.

To split the transaction's amount, you'll need to add the destinations object to the transaction. You need to specify all the destinations, and the amount to be split for each one of them.

For example, you want to split a transaction of 20 KWD placed on your Marketplace as follows:

14 KWD goes to a Business with a destination _id 12345
4 KWD goes to a delivery Business with a destination _id 56789
2 KWD goes to your account as your Marketplace's commission.
📘

The remaining amount of the transaction after the split, will goes directly to your Marketplace account.

The structure of the destinations object will be:

JSON
"destinations": {
    "destination": [
      {
        "id": "12345",
        "amount": 14,
        "currency": "KWD"
      },
      {
        "id": "56789",
        "amount": 4,
        "currency": "KWD"
      }
    ]
  }


Transactions will reflect on the Marketplace account and the Businesses' account as transfers.

Updated over 1 year ago

Onboarding Businesses
User Access Permissions
Did this page help you?
Yes
No

URL: https://developers.tap.company/reference/testing-cards

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Test Cards Numbers

Please use the following test card number to simulate the charging process as your customer.

Note: To enter the KNET test card number on the KNET page, select KNET Test Card [KNET1] option from the Bank drop-down list.

Local Payment Methods
Payment Method	Card Number	Expiry Date	PIN	Status
KNET	8888880000000001	09/25	1234	CAPTURED
KNET	8888880000000002	09/25	1234	CAPTURED
KNET	8888880000000001	05/21	1234	NOT CAPTURED
Benefit	4600410123456789	12/27	1234	CAPTURED
Benefit	7777770123456789	12/27	1234	NOT CAPTURED
Benefit	1111110123456789	12/27	1234	DECLINED
Naps/QPay	4215375500883243	12/24	944 (OTP 1234)	CAPTURED
Credit/Debit Cards
Payment Method	Card Number	3D Secure Enrolled
MasterCard	5123450000000008	Yes
MasterCard	5111111111111118	No
VISA	4508750015741019	Yes
VISA	4012000033330026	No
American Express	345678901234564	Yes
American Express	371449635398431	No
mada	4464040000000007	Yes
mada	5588480000000003	No
OmanNet	4228230000000001	Yes
Expiry Dates
Expiry Date	Transaction Response
01/39	APPROVED
05/22	DECLINED
04/27	EXPIRED_CARD
08/28	TIMED_OUT
01/37	ACQUIRER_SYSTEM_ERROR
02/37	UNSPECIFIED_FAILURE
05/37	UNKNOWN
CSC/CVV
	CSC/CVV	Response Gateway Code for MasterCard & Visa Cards
MasterCard & Visa Cards	100	MATCH
MasterCard & Visa Cards	101	NOT_PROCESSED
MasterCard & Visa Cards	102	NO_MATCH
American Express	1000	MATCH
American Express	1010	NOT_PROCESSED
American Express	1020	NO_MATCH
OmanNet	123 (OTP is 9999)	MATCH



STC Pay Phone Numbers
Country Code	Phone Number
966	557877988
966	506027231
966	537974429
966	558646150

Updated 6 months ago

Test Keys
Charges Response Codes
Did this page help you?
Yes
No
TABLE OF CONTENTS
Local Payment Methods
Credit/Debit Cards
Expiry Dates
CSC/CVV
STC Pay Phone Numbers

URL: https://developers.tap.company/reference/testing-keys

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Test Keys

Tap provides the common TEST API credentials to start the integration.

However, we recommend using your own test API keys, which are available under your dashboard.

Test API Keys
Secret Key
Publishable Key
Encryption Key
sk_test_XKokBfNWv6FIYuTMg5sLPjhJ

Secret API key	Publishable API Key	Encryption Key
The Secret API key is used for all the API calls on the server side.	The Publishable API key is used in the JS Elements to create the Token id and used in the JS
Checkout page.	This key is used for the encryption of sensitive card data before calling the Token API.

Updated almost 2 years ago

Payout Webhook and Download API
Test Cards Numbers
Did this page help you?
Yes
No
TABLE OF CONTENTS
Test API Keys

URL: https://developers.tap.company/reference/update-a-charge

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Create a Charge
POST
Retrieve a Charge
GET
Update a Charge
PUT
List all Charges
POST
Download Charges
POST
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Update a Charge
PUT
https://api.tap.company/v2/charges/{charge_id}

This endpoint updates the required details for a specified charge.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

To update a charge, set the values of the parameters passed. Any parameters not provided will be left unchanged. This request only accepts the description, metadata, and receipt arguments.

PATH PARAMS
charge_id
string
required

The unique charge.id that was returned from your previous charge request.

BODY PARAMS
description
string
Defaults to Test Description

An arbitrary string which you can attach to a charge object. It is displayed in the web interface alongside the charge.

metadata
object

Any additional information that the merchant wants to attach to the charge object.

METADATA OBJECT
RESPONSES
200

200

400

400

Updated about 2 months ago

Retrieve a Charge
List all Charges
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request PUT \
2
     --url https://api.tap.company/v2/charges/charge_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "description": "Test Description",
9
  "metadata": {
10
    "udf1": "Metadata 1"
11
  }
12
}
13
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/update-a-customer

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
Create a Customer
POST
Retrieve a Customer
GET
Update a Customer
PUT
Delete a Customer
DELETE
List all Customers
GET
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Update a Customer
PUT
https://api.tap.company/v2/customers/{customer_id}

This endpoint updates the required details for a specified customer.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

To update a customer, set the values of the parameters passed. Any parameters not provided will be left unchanged. This request accepts mostly the same arguments as the customer creation call.

PATH PARAMS
customer_id
string
required
Defaults to cus_TS03A1120241302m2B92407231

The customer unique ID

BODY PARAMS
title
string
Defaults to Mr.

The title of the customer.

first_name
string
Defaults to Ahmed

The first name of the customer.

middle_name
string
Defaults to M

The middle name of the customer.

last_name
string
Defaults to Al Nasser

The last name of the customer.

email
string
Defaults to a.alnasser@example.com

The email address of the customer.

phone
object

The phone number of the customer, including the country code and the actual number.

PHONE OBJECT
currency
string
Defaults to USD

The default currency for the customer.

nationality
string
Defaults to SA

The nationality of the customer.

description
string
Defaults to A valued customer since 2021.

A short description of the customer.

metadata
object

A set of key-value pairs that you can attach to the customer for additional information.

METADATA OBJECT
card
object

Add card id to select the default card or to remove the card from the default.

CARD OBJECT
RESPONSES
200

200

400

400

Updated 7 months ago

Retrieve a Customer
Delete a Customer
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request PUT \
2
     --url https://api.tap.company/v2/customers/cus_TS03A1120241302m2B92407231 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "title": "Mr.",
9
  "first_name": "Ahmed",
10
  "middle_name": "M",
11
  "last_name": "Al Nasser",
12
  "email": "a.alnasser@example.com",
13
  "phone": {
14
    "country_code": "965",
15
    "number": "51234567"
16
  },
17
  "currency": "USD",
18
  "nationality": "SA",
19
  "description": "A valued customer since 2021.",
20
  "metadata": {
21
    "customer_segment": "VIP",
22
    "preferred_contact_method": "email"
23
  },
24
  "card": {
25
    "id": "card_c14v24231144JRiz21UM7G141",
26
    "mode": "DEFAULT"
27
  }
28
}
29
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/update-a-refund

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
Create a Refund
POST
Retrieve a Refund
GET
Update a Refund
PUT
List All Refunds
POST
Download Refunds
POST
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Update a Refund
PUT
https://api.tap.company/v2/refunds/{refund_id}

This endpoint can be used to update the details of a specific refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
refund_id
string
required

Unique identifier for the refund object.

BODY PARAMS
metadata
string
RESPONSES
200

200

400

400

Updated over 1 year ago

Retrieve a Refund
List All Refunds
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request PUT \
2
     --url https://api.tap.company/v2/refunds/refund_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/update-an-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Update an Authorize
PUT
https://api.tap.company/v2/authorize/{authorize_id}

This endpoint updates the required details for any specified authorized transactions.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month

To update an authorized transaction, set the desired values for the parameters. Any parameters that are not provided will be left unchanged. This request only accepts the description, metadata, and receipt arguments.

PATH PARAMS
authorize_id
string
required
Defaults to auth_TS010720221114Hn5q2609463
BODY PARAMS
description
string
Defaults to Test Updated

The description of the authorize.

metadata
object

The details of the metadata key/value pairs that need to be updated. Individual keys can be unset by posting an empty value to them. All keys can be reset by posting an empty value to metadata.

METADATA OBJECT
RESPONSES
200

200

400

400

Updated about 2 months ago

Retrieve an Authorize
Void an Authorize
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request PUT \
2
     --url https://api.tap.company/v2/authorize/auth_TS010720221114Hn5q2609463 \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "description": "Test Updated",
9
  "metadata": {
10
    "udf1": "test_data_1",
11
    "udf2": "test_data_2",
12
    "udf3": "test_data_3"
13
  }
14
}
15
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/update-an-invoice

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
Create an Invoice
POST
Retrieve an Invoice
GET
Update an Invoice
PUT
Cancel an Invoice
DELETE
Remind an Invoice
POST
Finalize an Invoice
POST
List all Invoices
POST
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Update an Invoice
PUT
https://api.tap.company/v2/invoices/{invoice_id}
LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
invoice_id
string
required

[Required]

BODY PARAMS
draft
boolean

Merchant can save the invoice without creating the actual invoice. The default value will be false.

true
false
due
int32
required

Invoice Due Date; measured in seconds since the Unix epoch.

expiry
int32
required

Invoice Expiry Date; measured in seconds since the Unix epoch.

description
string

Invoice description

mode
string

Invoice mode- how the invoice page is showed to customers (INVOICE - Open invoice page, PAY - Open payment page, INVOICEPAY - Open invoice page and payment page.

note
string

It will be added in the invoice footer.

notifications
object

Notification object. By default, the invoice will be dispatched automatically.

NOTIFICATIONS OBJECT
channels
array of strings

Notifications channels.

ADD STRING
dispatch
boolean

Merchant can specify the field, dispatch the invoice or not.

true
false
currencies
array of strings

Charge currency object. If you pass null or empty, all currencies will show.

ADD STRING
metadata
object

Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.

METADATA OBJECT
charge
object

Charge Object

CHARGE OBJECT
customer
object
required

Customer object; Either customer ID or customer information is required.

CUSTOMER OBJECT
order
object
required

Order Object; Either order id or order information is required.

ORDER OBJECT
payment_methods
array of strings

Charge payment method object, if you pass null or empty, then all payment methods will show.

ADD STRING
post
object

Post url object.

POST OBJECT
redirect
object

Redirect url object.

REDIRECT OBJECT
reference
object

Merchant reference object.

REFERENCE OBJECT
invoicer
object

Email notification to merchant.

INVOICER OBJECT
payment_provider
object

Information about the payment provider associated with this invoice

PAYMENT_PROVIDER OBJECT
HEADERS
lang_code
string

optional

RESPONSES
200

200

400

400

Updated 5 months ago

Retrieve an Invoice
Cancel an Invoice
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request PUT \
2
     --url https://api.tap.company/v2/invoices/invoice_id \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "notifications": {
9
    "channels": [
10
      "SMS",
11
      "EMAIL"
12
    ],
13
    "dispatch": true
14
  },
15
  "metadata": {
16
    "udf1": "1",
17
    "udf2": "2",
18
    "udf3": "3"
19
  },
20
  "charge": {
21
    "receipt": {
22
      "email": true,
23
      "sms": true
24
    }
25
  },
26
  "customer": {
27
    "first_name": "test",
28
    "last_name": "test",
29
    "email": "test@test.com",
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/user-access-permissions

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
User Access Permissions

Access Levels and Permissions for Super Admin, Admin, and Agent

Financial Functions Access

Access to add user , refunds, transactions, statements, and settlements.

User Access	Statement	Settlement	Refund	Add User
Admin	Yes	Yes	Yes	Yes
Agent	No	No	No	No
Finance	Yes	Yes	Yes	No
Technology	Yes	Yes	Yes	No
Operation	No	No	Yes	No
Business	No	No	Yes	No
🚧

Note: The above access levels and permissions are subject to change based on the specific configuration and policies set by Tap Payments.

Adding Users to Tap Business Dashboard

To add users on the Tap business dashboard, follow these steps:

Step 1: Log in to the Dashboard:

Visit Tap Business Dashboard https://businesses.tap.company/
Log in using the main email user example: admin@merchant_company.com

Step 2 Navigate to User Management:
Click on Settings
Click on Users.
Create a User
Under Create a User, add the required details.
Select either Agent or Admin privilege (just one of them).
Customized User Access: For customized user access, send an email to the Developer Experience team: integrations@tap.company.
📘

Note: The specific privileges will be customized from our end based on your requirement(s). You can also specify if this user needs access to all the linked merchant account(s) or only selected ones.

This will be managed from the Tap Support team depending on the merchant account configuration.
You will receive a ticket number when you send an email and another ticket once it is resolved or closed.

Updated 7 months ago

Split Payments
Card Payments
Did this page help you?
Yes
No
TABLE OF CONTENTS
Financial Functions Access
Adding Users to Tap Business Dashboard
Step 1: Log in to the Dashboard:
Step 2 Navigate to User Management:
Create a User

URL: https://developers.tap.company/reference/verify-a-card

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Charges
Refund
TOKENS
Tokens
Cards
Retrieve a Card
GET
Verify a Card
POST
Delete a Card
DELETE
List All Cards
GET
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Verify a Card
POST
https://api.tap.company/v2/card/verify/

This endpoint validates credit cards and returns a response of either 'Valid' or 'Invalid.' It's intended for those who want to save cards for recurring payments. By validating the card, merchants can ensure that they only save valid cards. Additionally, the merchant can save the card in a single step by passing 'save_card = true'. There are three possible responses: INITIATED: Tap provides a payment URL (transaction.url) to initiate verification. The customer should be redirected to this URL to complete the verification; VALID: The card is valid; INVALID: The card is invalid.

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
BODY PARAMS
currency
string
required
Defaults to KWD

Validate Currency Code, Three digit ISO curreny code (Sample - KWD, USD..)

threeDSecure
boolean
Defaults to true

The 3D Secure request status for a card verification, values can be one of (true or false) default

true
false
save_card
boolean
Defaults to false

Payer can save the credit for future purpose. Customer phone number is required to save the card, values can be one of (true or false)

true
false
metadata
object

Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.

METADATA OBJECT
customer
object
required
CUSTOMER OBJECT
source
object
required

The Token ID of the card being verified.

SOURCE OBJECT
redirect
object
REDIRECT OBJECT
RESPONSES
200

200

400

400

Updated about 1 year ago

Retrieve a Card
Delete a Card
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
EXAMPLES
1
curl --request POST \
2
     --url https://api.tap.company/v2/card/verify/ \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json' \
5
     --header 'content-type: application/json' \
6
     --data '
7
{
8
  "currency": "KWD",
9
  "threeDSecure": true,
10
  "save_card": false,
11
  "metadata": {
12
    "udf1": "test1",
13
    "udf2": "test2"
14
  },
15
  "customer": {
16
    "first_name": "test",
17
    "middle_name": "test",
18
    "last_name": "test",
19
    "email": "test@test.com",
20
    "phone": {
21
      "country_code": "965",
22
      "number": "50000000"
23
    }
24
  },
25
  "redirect": {
26
    "url": "http://your_website.com/redirect_url"
27
  }
28
}
29
'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/reference/void-an-authorize

JUMP TO
CTRL-/
INTRODUCTION
API Authentication
ACCEPTANCE
Authorize
Create an Authorize
POST
Retrieve an Authorize
GET
Update an Authorize
PUT
Void an Authorize
POST
List All Authorize
POST
Download Authorize
POST
Charges
Refund
TOKENS
Tokens
Cards
BILLING
Invoices
PAYOUTS
Payout
ACCOUNTS
Lead
Business
Destinations
Merchant
INDIVIDUAL
Customers
FILES
Files
PAYOUT
Payout Webhook and Download API
TESTING
Test Keys
Test Cards Numbers
REFERENCE CODES
Charges Response Codes
BIN
Getting Started With Your API
DISPUTES
Download Disputes
POST
Void an Authorize
POST
https://api.tap.company/v2/authorize/{authorize_id}/void

This endpoint voids any existing authorizations under the given authorize_id

LOG IN TO SEE FULL REQUEST HISTORY
TIME	STATUS	USER AGENT	

Make a request to see history.
0 Requests This Month
PATH PARAMS
authorize_id
string
required
Defaults to auth_TS010720221114Hn5q2609463

The ID of the authorized transaction that needs to be voided.

RESPONSES
200

200

400

400

Updated almost 2 years ago

Update an Authorize
List All Authorize
Did this page help you?
Yes
No
LANGUAGE
Shell
Node
Ruby
PHP
Python
CREDENTIALS
HEADER
Header
CURL REQUEST
1
curl --request POST \
2
     --url https://api.tap.company/v2/authorize/auth_TS010720221114Hn5q2609463/void \
3
     --header 'Authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ' \
4
     --header 'accept: application/json'
Try It!
RESPONSE
EXAMPLES
Click Try It! to start a request and see the response here! Or choose an example:
application/json
200 - Result
400 - Result

URL: https://developers.tap.company/docs/card-sdk-web-v1

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Web Card SDK V1

Integrating Web Card SDK (v1) in Your Application

Introducing Tap Payment's Card JavaScript library, a powerful tool designed for crafting seamless payment experiences. This library empowers you to construct secure payment flows embedded within your web applications, enabling the collection of sensitive card information from users.

In this guide, we will walk you through the step-by-step creation of a dynamic payment form using the TAP JavaScript library, unlocking the potential for secure and user-friendly payment processing on your website.

Requirements

Using Elements for payment submissions requires a secure HTTPS connection. This is essential to guard against potential attacks and avoid mixed content warnings on modern browsers. Importantly, if the payment form is served over HTTP, the Elements SDK won't function correctly, compromising both security and functionality by preventing the generation of essential tokens for payment processing. In summary, maintaining an HTTPS connection is crucial for the secure and effective operation of your payment system.

🚧

For optimal security and functionality, the Card JS library must be utilized over an HTTPS connection, both in sandbox and production environments.

Card JS Elements Features

This library being our first embedded experience for accepting card payments like Visa, Mastercard and mada. This library is not just a tool; it's a comprehensive solution that enhances the security and user experience in online transactions. Here are its key features that set it apart:

A prebuilt UI component that not only efficiently gathers card details from customers but also tokenizes this sensitive information within the element, all without requiring interaction with your server.
Automatic formatting which formats card details as they are entered, streamlining the data entry process and reducing user errors.
Currency validation to ensuring compatibility with various global payment options, making it a versatile tool for international transactions.
Robust input validation with error response handling, ensuring customers are guided correctly through the payment process.
Real-time BIN (Bank Identification Number) response, that helps you gain immediate insights into the card type and issuing bank, adding an extra layer of verification.
Responsive design catering to various screen sizes and devices to ensures a seamless user experience.
Customizable style of the payment form that tailor the payment form's appearance, including font styles, sizes, and colors, particularly for the submit button, ensuring the form aligns perfectly with your brand's aesthetic.
What to Expect

Here you can see how the payment form will look like when implementing the Card JS library into your website, giving you an embedded form without requiring a redirection to Tap's hosted environment to tokenize the card and complete a payment. Moreover, in addition to having this form, you can also customize your own submit button to submit the card details once entered and then allowing you to get a token as a response which you need to use to complete the payment.

In order to see and test and fully working demo of the Card JS library, please follow this link.

Card JS Integration

We have streamlined the process of implementing the Card JS library, by providing the integration code in HTML, CSS, and JavaScript, ensuring a straightforward and user-friendly setup. To effectively integrate this library into your website, simply follow the steps outlined below.

Initialize and Setup Card Library

To begin integrating the TAP JS library, it's essential to load the SDK correctly and to provide a better experience for all screen sizes. Here is how to complete that.

Import the Library Scripts

You can initialize the library by including a specific script in the header of your HTML webpage. This step is crucial and should be the starting point of your integration process.

HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js"></script>
<script src="https://secure.gosell.io/js/sdk/tap.min.js"></script>

Responsive Dimension

To make JS element scale to dimensions of the device, You should include the following meta tag in your html header, noting that this an optional step but will provide a better user-experience when the website is accessed from different screen sizes.

HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0">

Referrer Policy

To control the information sent in the Referer header when navigating from your site to another, you should include the following meta tag in your HTML header. This is an optional step, but it will enhance security and privacy by limiting the referrer information shared with external sites.

<meta name="referrer" content="origin-when-crossorigin">

Create the Payment Form

To securely collect card details from your customers, Elements creates UI components for you that are hosted by Tap payments. They are then placed into your payment form, rather than you creating them directly. To determine where to insert these components, create empty DOM elements (containers) with unique IDs within your payment form.

HTML
<form id="form-container" method="post" action="/charge">
  <!-- Tap element will be here -->
  <div id="element-container"></div>
  <div id="error-handler" role="alert"></div>
  <div id="success" style=" display: none;;position: relative;float: left;">
        Success! Your token is <span id="token"></span>
  </div>
  <!-- Tap pay button -->
  <button id="tap-btn">Submit</button>
</form>

Style the Payment Form

To style the payment form and also the submit button, you need to add some CSS into your code. It is worth noting that the styling of the form is up to you, and below is an example to start with.

CSS
.form-row {
    width: 70%;
    float: left;
    background-color: #ededed;
}
#card-element {
background-color: transparent;
height: 40px;
border-radius: 4px;
border: 1px solid transparent;
box-shadow: 0 1px 3px 0 #e6ebf1;
-webkit-transition: box-shadow 150ms ease;
transition: box-shadow 150ms ease;
}

#card-element--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

#card-element--invalid {
  border-color: #fa755a;
}

#card-element--webkit-autofill {
  background-color: #fefde5 !important;
}

#submitbutton,#tap-btn{
align-items:flex-start;
background-attachment:scroll;background-clip:border-box;
background-color:rgb(50, 50, 93);background-image:none;
background-origin:padding-box;
background-position-x:0%;
background-position-y:0%;
background-size:auto;
border-bottom-color:rgb(255, 255, 255);
border-bottom-left-radius:4px;
border-bottom-right-radius:4px;border-bottom-style:none;
border-bottom-width:0px;border-image-outset:0px;
border-image-repeat:stretch;border-image-slice:100%;
border-image-source:none;border-image-width:1;
border-left-color:rgb(255, 255, 255);
border-left-style:none;
border-left-width:0px;
border-right-color:rgb(255, 255, 255);
border-right-style:none;
border-right-width:0px;
border-top-color:rgb(255, 255, 255);
border-top-left-radius:4px;
border-top-right-radius:4px;
border-top-style:none;
border-top-width:0px;
box-shadow:rgba(50, 50, 93, 0.11) 0px 4px 6px 0px, rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
box-sizing:border-box;color:rgb(255, 255, 255);
cursor:pointer;
display:block;
float:left;
font-family:"Helvetica Neue", Helvetica, sans-serif;
font-size:15px;
font-stretch:100%;
font-style:normal;
font-variant-caps:normal;
font-variant-east-asian:normal;
font-variant-ligatures:normal;
font-variant-numeric:normal;
font-weight:600;
height:35px;
letter-spacing:0.375px;
line-height:35px;
margin-bottom:0px;
margin-left:12px;
margin-right:0px;
margin-top:28px;
outline-color:rgb(255, 255, 255);
outline-style:none;
outline-width:0px;
overflow-x:visible;
overflow-y:visible;
padding-bottom:0px;
padding-left:14px;
padding-right:14px;
padding-top:0px;
text-align:center;
text-decoration-color:rgb(255, 255, 255);
text-decoration-line:none;
text-decoration-style:solid;
text-indent:0px;
text-rendering:auto;
text-shadow:none;
text-size-adjust:100%;
text-transform:none;
transition-delay:0s;
transition-duration:0.15s;
transition-property:all;
transition-timing-function:ease;
white-space:nowrap;
width:150.781px;
word-spacing:0px;
writing-mode:horizontal-tb;
-webkit-appearance:none;
-webkit-font-smoothing:antialiased;
-webkit-tap-highlight-color:rgba(0, 0, 0, 0);
-webkit-border-image:none;

}

Load the Library using JavaScript

To effectively utilize the Card JS library, begin by creating an instance of an Element in JavaScript once your form is loaded. This instance should be mounted onto the Element container you've previously set up. The main action of this process is the use of a public key provided by Tap, which grants access to the JS library and links it to your specific TAP account. Ensure you pass this public key as a parameter when calling Tapjsli().

Once you pass your account's public key in the Tapjsli(), and the payment form loads, it will show you to the left all the card payments logos that are enabled on your account. Add the below JavaScript code to complete this step.

JavaScript
//pass your public key from tap's dashboard
var tap = Tapjsli('pk_test_EtHFV4BuPQokJT6jiROls87Y');

var elements = tap.elements({});

var style = {
  base: {
    color: '#535353',
    lineHeight: '18px',
    fontFamily: 'sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, 0.26)',
      fontSize:'15px'
    }
  },
  invalid: {
    color: 'red'
  }
};
// input labels/placeholders
var labels = {
    cardNumber:"Card Number",
    expirationDate:"MM/YY",
    cvv:"CVV",
    cardHolder:"Card Holder Name"
  };
//payment options
var paymentOptions = {
  currencyCode:["KWD","USD","SAR"], //change the currency array as per your requirement
  labels : labels,
  TextDirection:'ltr', //only two values valid (rtl, ltr)
  paymentAllowed: ['VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'MADA'] //default string 'all' to show all payment methods enabled on your account
}
//create element, pass style and payment options
var card = elements.create('card', {style: style},paymentOptions);
//mount element
card.mount('#element-container');
//card change event listener
card.addEventListener('change', function(event) {
  if(event.loaded){ //If ‘true’, js library is loaded
    console.log("UI loaded :"+event.loaded);
    console.log("current currency is :"+card.getCurrency())
  }
  var displayError = document.getElementById('error-handler');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

Get Card BIN Details

The first six digits of a credit or debit card number are known as the "Bank Identification Number (BIN)," which are essential for identifying the card's issuing bank and other related details. The TAP JS Card library is equipped to retrieve this BIN information in real-time. To leverage this feature in your application, ensure that your code includes the below specific condition that should be added in the code that was shared in the previous step in card.addEventListener() as below, that triggers the retrieval of BIN details.

The condition stating if(event.BIN) {} shown in the JavaScript tab will display in the console of your website the card details related to the BIN added in the card form as shown in tab BIN Result.

JavaScript
BIN Result
card.addEventListener('change', function(event) {
  if(event.BIN){
    console.log(event.BIN)
  }
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

Tokenize the Card Details

Transforming the payment details collected through Elements into a token is an essential step in the process. To accomplish this, set up an event handler that manages the submit event on the form. This handler is responsible for transmitting the fields to TAP for tokenization and strategically prevents the form's default submission. The form submission is done through JavaScript in the subsequent step, ensuring a controlled and secure process of token generation for your payment transactions.

As you can see in the below step, the function tap.createToken() provides a Promise, offering a straightforward outcome:

result.id: Successful creation of a Token.
result.error: An indication of an error, including any client-side validation issues.
JavaScript

// Handle form submission
var form = document.getElementById('form-container');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  tap.createToken(card).then(function(result) {
    console.log(result);
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('error-handler');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      var errorElement = document.getElementById('success');
      errorElement.style.display = "block";
      var tokenElement = document.getElementById('token');
      tokenElement.textContent = result.id;
    tapTokenHandler(token)

    }
  });
});

Submit the Token to your Server

To conclude the integration of the Card JS library, the last step is to submit the generated token, along with any additional collected information, to your server. In the previous step, you can see in the code the function tapTokenHandler() has been called to handle the submission of the token, and below is the code used to complete this functionalitiy.

JavaScript
function tapTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'tapToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}


Updated 4 months ago

Recurring Payments
Web Card SDK V2
Did this page help you?
Yes
No
TABLE OF CONTENTS
Requirements
Card JS Elements Features
What to Expect
Card JS Integration
Initialize and Setup Card Library
Create the Payment Form
Style the Payment Form
Load the Library using JavaScript
Tokenize the Card Details
Submit the Token to your Server

URL: https://developers.tap.company/docs/card-sdk-web-v2

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Web Card SDK V2

Integrating Card SDK (V2) in Your Website

Introducing the TAP Card JavaScript library v2, an enhanced and streamlined solution tailored for crafting seamless payment experiences. This powerful tool simplifies the integration process, empowering you to effortlessly create secure payment flows within your web applications while ensuring the utmost protection of sensitive card information.

In this guide, we will walk you through the step-by-step process of integrating the latest TAP Card JavaScript library v2, showcasing its enhanced features such as simplified integration and efficient card tokenization.

Setup your Tap Account

If you haven't done so already, please register your business in Tap Payments in order to setup your own account and get the required public keys to start the Web Card SDK v2 integration.

Integrate Web Card SDK v2

In this section we will guide you on how to implement Web Card SDK v2 using Vanilla JS.

Here is a demo page for trying out our new Card SDK in beta.

The SDK will display the available payment methods and gather payment details from your customers.



Embed the SDK Script

In your HTML file, you have to embed the Card SDK v2 as per the below:

HTML
<script src="https://tap-sdks.b-cdn.net/card/1.0.2/index.js"></script>

Create a DOM element for Card SDK v2

Create a DOM container element within your checkout page to specify where the Card SDK will be displayed, assigning it an identifier.

HTML
<div id="card-sdk-id"></div>

🚧

We highly advise not to embed the Card SDK within an iframe element to avoid potential complications.

Configure the Card SDK

For this implementation to work, initialize essential functions and constants provided within the SDK. These functions and constants facilitate the seamless integration of the Web Card SDK into your web page.

Once the initialization is complete, you can proceed to configure the Web Card SDK to tailor the checkout flow according to your specific requirements and preferences. This involves creating a comprehensive configuration setup covering various aspects of the checkout process to enhance the user experience for your customers.

In this section we will list the parameters that can be used as well as completing the configuration of the SDK.

Parameters

Here you can see all the parameters that can be passed to the Card SDK configuration.

Name	Type	R/O	Description
publicKey	string	required	The public Key provided by Tap
merchant	object	optional	The merchant object
merchant.id	string	optional	The merchant's Tap id.
transaction	object	required	The transaction object
transaction.amount	number	required	The transaction amount.
transaction.currency	string	required	The transaction currency.
customer	object	optional	The customer object
customer.id	string	optional	The Tap customer ID
customer.name	Array	optional	The customer name object
customer.name[index].lang	string	optional	The customer name language
customer.name[index].first	string	optional	The customer first name
customer.name[index].last	string	optional	The customer last name
customer.name[index].middle	string	optional	The customer middle name
customer.name.nameOnCard	string	optional	The customer name on card
customer.name.editable	boolean	optional	To control the name editing
customer.contact	object	optional	The customer contact object
customer.contact.email	string	optional	The customer email
customer.contact.phone	object	optional	The customer phone object
customer.contact.phone.countryCode	string	optional	The customer phone country code
customer.contact.phone.number	string	optional	The customer phone number
acceptance	object	optional	The acceptance object
acceptance.supportedBrands	string[]	optional	The supported brands
acceptance.supportedCards	string[]	optional	The supported cards.

Ex:

"ALL", to accept both Debit and Credit cards.
["DEBIT"], to accept only Debit cards.
["CREDIT"], to accept only Credit cards.

fields	object	optional	The fields object
fields.cardHolder	boolean	optional	To show/hide the card holder name
addons	object	optional	The addons object
addons.loader	boolean	optional	To show/hide the loader on the card
addons.saveCard	boolean	optional	To show/hide the save card option
addons.displayPaymentBrands	boolean	optional	To show/hide the payment brands section
interface	object	optional	The interface object
interface.locale	string	optional	The card locale
interface.theme	string	optional	The card theme
interface.edges	string	optional	The card edges
interface.direction	string	optional	The card direction
onReady	function	optional	Callback function runs when card becomes ready
onFocus	function	optional	Callback function runs when card is focused
onBinIdentification	function	optional	Callback function runs when bin is identified
onValidInput	function	optional	Callback function runs when card inputs are valid
onInvalidInput	function	optional	Callback function runs when card inputs are invalid
onError	function	optional	Callback function runs when card has an error
onSuccess	function	optional	Callback function runs when card is successfully done
Card SDK Configuration

In this section we showcase the JavaScript code needed to configure the Web Card SDK v2.

Note that it is mandatory to pass the public key linked to your Tap account, which you can find by logging in to Tap's business dashboard, as well as specifying your Tap merchant ID.

JavaScript
const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } = window.CardSDK
const { unmount } = renderTapCard('card-sdk-id', {
  publicKey: 'pk_test_...', // Tap's public key
  merchant: {
    id: 'merchant id'
  },
  transaction: {
    amount: 1,
    currency: Currencies.SAR
  },
  customer: {
    id: 'customer id', //Tap's customer ID with syntax cus_xxx
    name: [
      {
        lang: Locale.EN,
        first: 'Test',
        last: 'Test',
        middle: 'Test'
      }
    ],
    nameOnCard: 'Test',
    editable: true,
    contact: {
      email: 'test@gmail.com',
      phone: {
        countryCode: '971',
        number: '52999944'
      }
    }
  },
  acceptance: {
    supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'], //Remove the ones that are NOT enabled on your Tap account
    supportedCards: "ALL" //To accept both Debit and Credit
  },
  fields: {
    cardHolder: true
  },
  addons: {
    displayPaymentBrands: true,
    loader: true,
    saveCard: true
  },
  interface: {
    locale: Locale.EN,
    theme: Theme.LIGHT,
    edges: Edges.CURVED,
    direction: Direction.LTR
  }
})

Add the Event Handlers

To keep the payers aware of what is happening during the payment process, make sure to add the callback functions in the SDK configuration. This will allow you to know the the SDK is ready to be used, if the inputs entered are valid or not, if there is any errors and in the success flow, it will display the tokenized card that the customer has submitted.

JavaScript
  onReady: () => console.log('onReady'),
  onFocus: () => console.log('onFocus'),
  onBinIdentification: (data) => console.log('onBinIdentification', data),
  onValidInput: (data) => console.log('onValidInputChange', data),
  onInvalidInput: (data) => console.log('onInvalidInput', data),
  onError: (data) => console.log('onError', data),
  onSuccess: (data) => console.log('onSuccess', data),
  onChangeSaveCardLater: (isSaveCardSelected) => console.log(isSaveCardSelected, " :onChangeSaveCardLater") // isSaveCardSelected:boolean

Full HTML Code Sample

In this section you will find the full code sample of the HTML and JavaScript codes that you can use to easily test the integration. Make sure to use the correct public key linked to your Tap account.

HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="https://tap-sdks.b-cdn.net/card/1.0.0-beta/index.js"></script>

		<title>card demo</title>
	</head>
	<body>
		<div id="card-sdk-id"></div>
		<script>
			const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } = window.CardSDK
			const { unmount } = renderTapCard('card-sdk-id', {
				publicKey: 'pk_test_...',
				merchant: {
					id: 'merchant id'
				},
				transaction: {
					amount: 1,
					currency: Currencies.SAR
				},
				customer: {
					id: 'customer id',
					name: [
						{
							lang: Locale.EN,
							first: 'Test',
							last: 'Test',
							middle: 'Test'
						}
					],
					nameOnCard: 'Test Test',
					editable: true,
					contact: {
						email: 'test@gmail.com',
						phone: {
							countryCode: '20',
							number: '1000000000'
						}
					}
				},
				acceptance: {
					supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'],
					supportedCards: "ALL"
				},
				fields: {
					cardHolder: true
				},
				addons: {
					displayPaymentBrands: true,
					loader: true,
					saveCard: true
				},
				interface: {
					locale: Locale.EN,
					theme: Theme.LIGHT,
					edges: Edges.CURVED,
					direction: Direction.LTR
				},
				onReady: () => console.log('onReady'),
				onFocus: () => console.log('onFocus'),
				onBinIdentification: (data) => console.log('onBinIdentification', data),
				onValidInput: (data) => console.log('onValidInputChange', data),
				onInvalidInput: (data) => console.log('onInvalidInput', data),
           onChangeSaveCardLater: (isSaveCardSelected) => console.log(isSaveCardSelected, " :onChangeSaveCardLater"), // isSaveCardSelected:boolean
				onError: (data) => console.log('onError', data),
				onSuccess: (data) => console.log('onSuccess', data)
			})
		</script>
	</body>
</html>

Get the Tap Token

After the Web Card SDK is fully configured and initialized, you need to create a submit button in order to submit the payment form. In order to tokenize the card added, you have to also import the tokenize method that is available within the SDK to complete this step.

In this section we will share the methods can be used within the SDK as well as calling the tokenize method to convert the raw card details to tokens.

Card Methods

To leverage the full functionality of the SDK, it's essential to comprehend the array of methods at your disposal. Here, we'll outline each method alongside its purpose, followed by guidance on incorporating them into your codebase.

Methods List
Name	Description
resetCardInputs	Reset the card inputs
saveCard	Save the card data
tokenize	Tokenize the card date
updateCardConfiguration	Update the card configuration. For example updating the currency to show the supported payment methods ex: transaction: {currency: "USD" } will shows only the payment methods that supports USD currency
updateTheme	Update the card theme by sending in the parameter "dark" or "light"
loadSavedCard	Load the saved card by card id
Import Methods in your Code

You can import all the required methods from the SDK as follows:

JavaScript
const { 
  tokenize, 
  resetCardInputs,
  saveCard,
  updateCardConfiguration,
  updateTheme,
  loadSavedCard } = window.CardSDK

Tokenize the Card

To submit the card details that were added in the Web Card v2, you need to create a button, and on this button you need to add the onclick event and call the tokenize method from the SDK to the Tap token.

You can either call the tokenize method in the JavaScript code or directly in the onclick event of the button, in the HTML file, as per the below.

HTML
<button id="card-v2" onclick="window.CardSDK.tokenize()">Submit</button>

Tokenize Result

In the onSucess callback you will receive the Tap token that you need pass to the source.id of the create a charge API to complete the payment with the added card.

Here is a sample of the token response that you will receive

JSON
{
    "id": "tok_xuCp45241437ANEj31F4P426",
    "status": "ACTIVE",
    "created": 1714747065426,
    "object": "token",
    "live_mode": false,
    "type": "CARD",
    "purpose": "CHARGE",
    "used": false,
    "card": {
        "id": "card_cfeU45241437Saus3j947433",
        "object": "card",
        "on_file": false,
        "address": {},
        "funding": "CREDIT",
        "fingerprint": "B1XZy88SUJkZ4%2FP%2Bn16CZO7k2l34nUHNoephQ0T94hA%3D",
        "brand": "VISA",
        "scheme": "VISA",
        "category": "",
        "exp_month": 1,
        "exp_year": 39,
        "last_four": "1111",
        "first_six": "411111",
        "first_eight": "41111111",
        "name": "Test"
    },
    "payment": {
        "id": "card_cfeU45241437Saus3j947433",
        "on_file": false,
        "card_data": {
            "exp_month": 1,
            "exp_year": 39,
            "last_four": "1111",
            "first_six": "411111",
            "first_eight": "41111111",
            "address": {}
        },
        "fingerprint": "B1XZy88SUJkZ4%2FP%2Bn16CZO7k2l34nUHNoephQ0T94hA%3D",
        "scheme": "VISA",
        "category": ""
    },
    "merchant": {
        "id": "12345"
    }
}



Before You Go Live
🚧

To work on live mode you have to use the API key related to the hosting domain.

To register the hosting domain you have to contact integrations@tap.company to register your domain. After the integration team confirms the domain is registred then you can find the needed Keys added in your account.
Note that the API key for the registred domain can work with all the subdomains related to the registred domain.

Updated 3 months ago

Web Card SDK V1
Overview of Payment Methods
Did this page help you?
Yes
No
TABLE OF CONTENTS
Setup your Tap Account
Integrate Web Card SDK v2
Embed the SDK Script
Create a DOM element for Card SDK v2
Configure the Card SDK
Full HTML Code Sample
Get the Tap Token
Card Methods
Tokenize the Card
Tokenize Result
Before You Go Live

URL: https://developers.tap.company/docs/benefitpay-web-sdk

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Web
iOS
Android
React-Native
Flutter
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Web

Integrating BenefitPay SDK in your web application

Introduction

This guide provides instructions for integrating the Benefit Pay button into your website, with scripts available for both Vanilla JavaScript and React JS, accommodating your preferred programming language.

Once the scripts are added, the Benefit Pay button will appear in your web application. When clicked, users will receive a QR code that directs them to the Benefit Pay app for secure and efficient payment completion.

Prerequisites

In order for Benefit Pay Web SDK to function, the domain name needs to be registered with Tap. Reach out to tap support team and provide your domain name(s) where you wish to put the Benefit Pay button. Once tap registers the domain, your public key respective to the domain will be generated and made available on the tap business dashboard. You will have to provide the respective Public Key, Hash String and merchant ID in order to initiate the Benefit Pay Web SDK.

Benefit Pay Web SDK Integration

We have provided the Benefit Pay Web SDK codes, in both React.js and Vanilla JS providing merchants with more options depending on the programming language that they are using.

Benefit Pay Integration using React JS

The React module for the Benefit Pay web SDK is available through the NPM registry. You can install it using either of the following commands:

Install the library via NPM:

npm install @tap-payments/benefit-pay-button


Or using Yarn:

yarn add @tap-payments/benefit-pay-button

Example of the React JS Integration Code (ES6)

The following code demonstrates how to integrate the Benefit Pay button in a React.js project. Be sure to pass the public key and merchant ID provided by Tap.

React JS
import React from 'react'
import { BenefitPayButton, Edges, Locale } from '@tap-payments/benefit-pay-button'

const App = () => {
	return (
		<BenefitPayButton
			// required (The public Key provided by Tap)
			operator={{
				publicKey: 'pk_test_xxxx',
    		hashString: myHashString
			}}
			// optional (to enable the debug mode)
			debug={true}
			// required
			merchant={{
				// required (The merchant identifier provided by Tap)
				id: 'merchant_xxxx'
			}}
			// required
			transaction={{
				// required (The amount to be charged)
				amount: '12',
				// required (The currency of the amount)
				currency: 'BHD'
			}}
			reference={{
				transaction: 'txn_123',
				order: 'ord_123'
			}}
			// optional (The billing contact information)
			customer={{
				//"OPTIONAL : Customer ID",
				names: [
					{
						// required : en or ar",
						lang: Locale.EN,
						// required : First name of the customer.",
						first: 'test',
						// required : Last name of the customer.",
						last: 'tester',
						// optional : Middle name of the customer.",
						middle: 'test'
					}
				],
				// optional: Defines the contact details for the customer
				contact: {
					// optional: The customer's email",
					email: 'test@gmail.com',
					// optional: The customer's phone number"
					phone: {
						// required:  The customer's country code",
						countryCode: '+20',
						// required:  The customer's phone number
						number: '1000000000'
					}
				}
			}}
			//optional (for styling button)
			interface={{
				// optional (The locale of the Benefit Pay button and it can be one of these locales:[EN,AR])
				locale: Locale.EN,
				// optional (The border of the button and it can be one of these values:[curved,straight])
				edges: Edges.CURVED
			}}
			post={{
				url: ''
			}}
			// optional (A callback function that will be called when you button is clickable)
			onReady={() => {
				console.log('Ready')
			}}
			// optional (A callback function that will be called when the button clicked)
			onClick={() => {
				console.log('Clicked')
			}}
			// optional (A callback function that will be called when you cancel the payment)
			onCancel={() => console.log('cancelled')}
			// optional (A callback function that will be called when you have an error)
			onError={(err) => console.log('onError', err)}
			// optional (A async function that will be called after creating the token successfully)
			onSuccess={(data) => {
				// do your stuff here...
				console.log(data)
			}}
		/>
	)
} 

Benefit Pay Integration using Vanilla JS
Vanilla JS
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Benefit pay button</title>
		<script src="https://tap-sdks.b-cdn.net/benefit-pay/build-1.0.20/main.js"></script>
	</head>

	<body>
		<div id="benefit-pay-button"></div>
		<script type="text/javascript">
			const { render, Edges, Locale, ThemeMode } = window.TapBenefitpaySDK
			render(
				{
					operator: {
						publicKey: 'pk_test_xxxx',
            hashString: myHashString
					},
					debug: true,
					merchant: {
						id: 'merchant_xxxx'
					},
					transaction: {
						amount: '12',
						currency: 'BHD'
					},
					reference: {
						transaction: 'txn_123',
						order: 'ord_123'
					},
					customer: {
						names: [
							{
								lang: Locale.EN,
								first: 'test',
								last: 'tester',
								middle: 'test'
							}
						],
						contact: {
							email: 'test@gmail.com',
							phone: {
								countryCode: '20',
								number: '1234567'
							}
						}
					},
					interface: {
						locale: Locale.EN,
						edges: Edges.CURVED
					},
					post: {
						url: ''
					},
					onReady: () => {
						console.log('Ready')
					},
					onClick: () => {
						console.log('Clicked')
					},
					onCancel: () => console.log('cancelled'),
					onError: (err) => console.log('onError', err),
					onSuccess: (data) => {
						console.log(data)
					}
				},
				'benefit-pay-button'
			)
		</script>
	</body>
</html>



Hash String Calculation

In the Benefit Pay integration, the hash string is a crucial security measure used to verify the integrity and authenticity of the request. The hash string is generated by concatenating specific transaction details and then applying the HMAC SHA256 hashing algorithm to the resulting string. The hash is signed using the merchant's secret key, which should be kept confidential and never shared with anyone.

This ensures that the request sent to the payment gateway has not been tampered with, and only valid transactions from authorized sources are processed.

How Hashing Works:
String Preparation: First, you need to concatenate the relevant transaction data (like public key, amount, currency, etc.) into a single string, in a specific order. This string will be used to generate the hash.
Hashing Algorithm: Once the string is prepared, it should be hashed using the HMAC SHA256 algorithm. The merchant's secret key will be used as the key for the hashing process.
Resulting Hash String: The output of this operation will be a unique hash string, which is sent along with the request to the payment gateway. The gateway will verify this hash to ensure that the request is legitimate.
Required Fields for Hash Generation:
Public Key: The public key provided by Tap, used to identify the merchant in the payment request.
Secret Key: A confidential key provided by Tap. It is used to sign the request and must be stored securely.
Amount: The amount to be processed. This value must be formatted to 3 decimal places (e.g., 3 BHD = 3.000).
Currency: The currency of the transaction, represented by a 3-letter ISO code (e.g., BHD for Bahraini Dinar).
Post URL: The URL to which the payment gateway will send the response (commonly used for webhooks to update transaction status).
Transaction Reference: A unique identifier for the transaction. This helps in tracking and identifying individual payments.
🚧

Make sure the amount is set in a 3 decimal format (e.g., 3 BHD should be 3.000 in the hash string) and the secret key never logged or exposed in client-side code

Hash String Code Sample
Hash
// Input fields for Hash Calculation
publicApiKey = 'pk_test_xxxx';  //Your Public API Key Provided by Tap
amount = 'charge.amount'; 		//charge amount formatted to 3 decimal places
currency = 'charge.currency'; //charge currency (BHD)
transactionReference = 'reference.transaction' //reference transaction
postUrl = 'charge.postUrl' //the Post URL that receives the webhook
secretAPIKey = "sk_test_xxxx"; //Your secret API Key provided by Tap

// Concatenate the fields to form the string that will be hashed
toBeHashed = `x_publickey${publicApiKey}x_amount${amount}x_currency${currency}x_transaction${transactionReference}x_post${postUrl}`;

// Log the string to be hashed for verification
console.log("String to be hashed: ", toBeHashed);

// Create the hash string using HMAC SHA256 and your secret API key
myHashString = hash_hmac('sha256', toBeHashed, secretAPIKey);

// Output the resulting hash string (this is what you need to send)
console.log("Generated Hash String: ", myHashString);

Event Handling

Use event handling to manage actions related to the Benefit Pay button. These callback functions handle button clicks, cancellations, errors, and successful payments.

JS
onCancel: async () => {
  console.log('onCancel');
},
onError: async (error) => {
  console.log('onError', error);
},
onSuccess: async (data) => {
  console.log('onSuccess', data);
},
onReady: async () => {
  console.log('onReady');
}

Parameters
Name	Type	R/O	Description
operator	object	Required	The operator object that contains the public key + hashString
operator.publicKey	string	Required	The public key provided by Tap
operator.hashString	string	Required	The hash string to secure your transaction
debug	bool	Optional	To enable the debug mode
merchant	object	Required	The merchant object that contains the merchant identifier
merchant.id	string	Required	The merchant identifier provided by Tap
transaction	object	Required	The transaction object that contains the amount and currency
transaction.amount	string	Required	The amount to be charged
transaction.currency	string	Required	The currency of the amount
reference	object	Optional	The reference object that contains the transaction and order references
reference.transaction	string	Required	passed by the merchant for further processing whenever needed.
reference.order	string	Optional	passed by the merchant for further processing whenever needed.
customer	object	Required	The customer object that contains the customer details
customer.id	object	Optional	The customer ID
customer.names	array	Required	The customer names and it can be one of these values: [EN, AR]
customer.names[idx].lang	string	Required	The customer name language and it can be one of these values: [EN, AR]
customer.names[idx].first	string	Required	The customer first name
customer.names[idx].last	string	Required	The customer last name
customer.names[idx].middle	string	Optional	The customer middle name
customer.contact	object	Optional	The customer contact object that contains the email and phone number
customer.contact.email	string	Required	The customer email
customer.contact.phone	object	Required	The customer phone object that contains the country code and number
customer.contact.phone.countryCode	string	Required	The customer country code
customer.contact.phone.number	string	Required	The customer phone number
interface	object	Optional	The interface object that contains the locale and edges
interface.locale	string	Optional	The locale of the Benefit Pay button and it can be one of these locales: [EN, AR]
interface.edges	string	Optional	The border of the button and it can be one of these values: [CURVED, STRAIGHT]
post	object	Required	This is the webhook for your server, needed to update you server.
post.url	string	Required	This is the webhook URL for your server, needed to update you server.
onReady	func	Optional	A callback function that will be called when the button become ready
onClick	func	Optional	A callback function that will be called when the button clicked
onCancel	func	Optional	A callback function that will be called when you cancel the payment
onError	func	Optional	A callback function that will be called when you have an error
onSuccess	func	Optional	A callback function that will be called after finishing the payment successfully

Should you encounter any difficulties or have specific questions, reach out to the Tap Payments support team for prompt assistance. Happy integrating!

Updated 3 months ago

Benefit Pay
iOS
Did this page help you?
Yes
No
TABLE OF CONTENTS
Introduction
Prerequisites
Benefit Pay Web SDK Integration
Benefit Pay Integration using React JS
Benefit Pay Integration using Vanilla JS
Hash String Calculation
How Hashing Works:
Required Fields for Hash Generation:
Hash String Code Sample
Event Handling
Parameters

URL: https://developers.tap.company/docs/webhook

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Webhook

Tap ensures secure and realtime webhooks for payment events, and to send the post payment details.

Payments webhook is a server-to-server call(also known as IPN "Instant Payment Notification"), that allows merchants to receive the post-payment details to automate and synchronize their internal ERPs by checking the actual payment status and other technical details, as per requirements.

It's supported with all our APIs, SDKs & Libraries where it is required to be.

Tap also triggers the webhooks for different payment events, such as when a payment is completed, when a customer views a bill, when a recurring payment occurred, etc.

Webhook Requires

Following the steps below

Merchants need to create their own endpoint server page(usually with the post method) which can receive the webhooks.
Make sure your endpoint URL is active and working smoothly, and ready to accept webhooks.
Define the webhook endpoint URL in the API/SDK call (parameter POST:"url"), when required.
JSON
{
"post": {
    "url": "https://webhook.site/fd8b0712-d70a-4280-8d6f-9f14407b3bbd"
   },
}

What are webhooks

Webhooks refer to a combination of elements that collectively create a notification and reaction system within a larger integration.

Metaphorically, webhooks are like a phone number that Tap calls to notify you of activity in your payment transaction lifecycle. The activity could be the completion of payment or a successful charge within a Subscription. The webhook endpoint is the person answering that call who takes actions based on the specific information it receives.

Non-metaphorically, the webhook endpoint is just more code on your server, which could be written in Ruby, PHP, Node.js, or whatever. The webhook endpoint has an associated URL (e.g., https://example.com/webhooks). The Tap notifications are Event objects. This Event object contains all the relevant parameters of the API response, including the amount, currency, transaction reference, and status of the transaction. The webhook endpoint uses the charge details to take any required actions, such as indicating that the payment is completed.

When to use webhooks

Many events that occur within a Tap account have synchronous results–immediate and direct–to an executed request. For example, a successful request to create a customer immediately returns a Customer object. Such requests don’t require webhooks, as the key information is already available.

Other events that occur within a Tap Payment Ecosystem are asynchronous: happening at a later time and not directly in response to your code’s execution. Most commonly these involve:

The completion of a Charge Transaction
The payment of a due Invoice
Individual Charges within a Subscription

With these and similar APIs, Tap needs to notify your integration about changes to the status of an object so your integration can take subsequent steps.

The specific actions your webhook endpoint may take differs based upon the event. Some examples include:

Updating a customer’s payment record in your database when a subscription payment succeeds
Making adjustments to an invoice when it’s attempted (but before it’s been paid)
Logging an accounting entry when an invoice is paid

Webhooks can also be used to provide state and API responses to services or systems that use Tap data for things like replication, analytics, or alerting.

📘

Best Practice

In case, after a successful payment capture, if the user closes the browser or if the internet connection is not available till the customer is redirected back to the Merchant Website/App, POST URL is a sure mechanism to get notified of the final payment status. Although POST URL is optional, we highly recommend implementing it.

❗️

Important notes

1- If the POST URL is not accessible, the posting of the response payload will be failed. There will be two more retry attempts before the status of the POST is updated as ERROR. You can find the POST status in the API Response

2- Only raw data will be posted, make sure to send raw data to the POST URL. The URL should accept post data for captured or failed transactions only , if the transaction status is INITIATED or ABANDONED no data will be posted and post status will be PENDING.

3- The post data cannot be posted to local host. If the data did not reach the URL it will show Error.

4- If the post data are not received on post URL , check the SSLS ,if you are using open source certificate, you will not be able to post the response on your website.

Webhook Example for a Charges Response
JSON
{
    "method": "POST",
    "url": "https://webhook.site/25c5e885-216b-4d5f-bcbf-8e5d0d20b76f",
    "headers": [
        {
            "name": "connection",
            "value": "close"
        },
        {
            "name": "accept-encoding",
            "value": "gzip,deflate"
        },
        {
            "name": "user-agent",
            "value": "Apache-HttpClient/4.5.13 (Java/18.0.2.1)"
        },
        {
            "name": "host",
            "value": "webhook.site"
        },
        {
            "name": "content-length",
            "value": "2480"
        },
        {
            "name": "hash",
            "value": "12dd1ed1008db28cfac344993564cc71da813a98b5c80d892744ee9bc3d8e76d"
        },
        {
            "name": "hashstring",
            "value": "356f77b65c5fc809ce5f1f6e2279932949ca86833867f6da5dbb92800df6238f"
        },
        {
            "name": "content-type",
            "value": "application/json"
        },
        {
            "name": "accept",
            "value": "text/plain, application/json, application/cbor, application/*+json, */*"
        }
    ],
    "bodySize": 2480,
    "postData": {
        "mimeType": "application/json",
        "text": "{\"id\":\"chg_TS05A4120230736x9K22710693\",\"object\":\"charge\",\"live_mode\":false,\"customer_initiated\":true,\"api_version\":\"V2\",\"method\":\"POST\",\"status\":\"CAPTURED\",\"amount\":1.0,\"currency\":\"SAR\",\"threeDSecure\":true,\"card_threeDSecure\":false,\"save_card\":true,\"merchant_id\":\"\",\"product\":\"\",\"description\":\"\",\"metadata\":{\"udf1\":\"test_data_1\",\"udf2\":\"test_data_2\",\"udf3\":\"test_data_3\"},\"transaction\":{\"timezone\":\"UTC+03:00\",\"created\":\"1698392202943\",\"expiry\":{\"period\":30,\"type\":\"MINUTE\"},\"asynchronous\":false,\"amount\":1.0,\"currency\":\"SAR\"},\"reference\":{\"track\":\"tck_TS04A4320230736To522710661\",\"payment\":\"4327230736106619650\",\"gateway\":\"mada_pg70983e7a-a686-40ba-83e2-c5e9f4074fe5\",\"acquirer\":\"230004002581\",\"transaction\":\"txn_0001\",\"order\":\"ord_0001\"},\"response\":{\"code\":\"000\",\"message\":\"Captured\"},\"security\":{\"threeDSecure\":{\"status\":\"Y\"}},\"gateway\":{\"response\":{\"code\":\"000\",\"message\":\"Approved\"}},\"card\":{\"id\":\"card_IIGi4523416sFHe27jJ9E589\",\"object\":\"card\",\"first_six\":\"446404\",\"first_eight\":\"44640400\",\"scheme\":\"MADA\",\"brand\":\"VISA\",\"last_four\":\"0007\"},\"receipt\":{\"id\":\"204327230736104914\",\"email\":true,\"sms\":true},\"customer\":{\"id\":\"cus_TS07A5420232136o2K52709053\",\"first_name\":\"Majdi\",\"middle_name\":\"Abdullah\",\"last_name\":\"Al Khowaiter\",\"email\":\"m.ghgjhgj@tap.company\",\"phone\":{\"country_code\":\"966\",\"number\":\"51234567\"}},\"merchant\":{\"country\":\"SA\",\"currency\":\"SAR\",\"id\":\"25145693\"},\"source\":{\"object\":\"token\",\"type\":\"CARD_NOT_PRESENT\",\"payment_type\":\"DEBIT\",\"payment_method\":\"MADA\",\"channel\":\"INTERNET\",\"id\":\"tok_nLKq4223436fVYL27Nj9P855\"},\"redirect\":{\"status\":\"PENDING\",\"url\":\"http://your_website.com/redirecturl\"},\"post\":{\"attempt\":1,\"status\":\"PENDING\",\"url\":\"https://webhook.site/25c5e885-216b-4d5f-bcbf-8e5d0d20b76f\"},\"activities\":[{\"id\":\"activity_TS03A4420230736Rb512710536\",\"object\":\"activity\",\"created\":1698392202943,\"status\":\"INITIATED\",\"currency\":\"SAR\",\"amount\":1.0,\"remarks\":\"charge - created\"},{\"id\":\"activity_TS07A1320230737j1H42710453\",\"object\":\"activity\",\"created\":1698392233453,\"status\":\"CAPTURED\",\"currency\":\"SAR\",\"amount\":1.0,\"remarks\":\"charge - captured\"}],\"auto_reversed\":false,\"payment_agreement\":{\"id\":\"payment_agreement_23Ah4423436I5R027SS9c330\",\"amount_variability\":\"VARIABLE\",\"type\":\"UNSCHEDULED\",\"total_payments_count\":1,\"contract\":{\"id\":\"card_IIGi4523416sFHe27jJ9E589\",\"customer_id\":\"cus_TS07A5420232136o2K52709053\",\"type\":\"SAVED_CARD\"},\"metadata\":{\"txn_type\":\"CHARGE\",\"txn_id\":\"chg_TS05A4120230736x9K22710693\",\"terminal_id\":\"ter_g6P51020221643Rj631205942\"}}}"
    }
}

Webhook Example for an Authorize Response
JSON
{
    "method": "POST",
    "url": "https://webhook.site/25c5e885-216b-4d5f-bcbf-8e5d0d20b76f",
    "headers": [
        {
            "name": "connection",
            "value": "close"
        },
        {
            "name": "accept-encoding",
            "value": "gzip,deflate"
        },
        {
            "name": "user-agent",
            "value": "Apache-HttpClient/4.5.13 (Java/18.0.2.1)"
        },
        {
            "name": "host",
            "value": "webhook.site"
        },
        {
            "name": "content-length",
            "value": "2188"
        },
        {
            "name": "hashstring",
            "value": "da91e16a4c840a3c9826e454b255d1980cb9d95e5b783ed3d2c0e69b1b774f29"
        },
        {
            "name": "content-type",
            "value": "application/json"
        },
        {
            "name": "accept",
            "value": "text/plain, application/json, application/cbor, application/*+json, */*"
        }
    ],
    "bodySize": 2188,
    "postData": {
        "mimeType": "application/json",
        "text": "{\"id\":\"auth_TS04A1720230745Rt2a2710607\",\"object\":\"authorize\",\"customer_initiated\":true,\"authorize_debit\":false,\"live_mode\":false,\"api_version\":\"V2\",\"status\":\"AUTHORIZED\",\"amount\":100.0,\"currency\":\"SAR\",\"threeDSecure\":true,\"save_card\":true,\"merchant_id\":\"\",\"product\":\"\",\"transaction\":{\"authorization_id\":\"125468\",\"timezone\":\"UTC+03:00\",\"created\":\"1698392719404\",\"expiry\":{\"period\":30,\"type\":\"MINUTE\"},\"asynchronous\":false,\"amount\":100.0,\"currency\":\"SAR\"},\"reference\":{\"track\":\"tck_TS02A2020230745q4MN2710966\",\"payment\":\"2027230745109668360\",\"gateway\":\"123456789\",\"acquirer\":\"330004125468\",\"transaction\":\"txn_0001\",\"order\":\"ord_0001\"},\"response\":{\"code\":\"001\",\"message\":\"Authorized\"},\"security\":{\"threeDSecure\":{\"id\":\"3ds_TS05A1920230745Tb452710404\",\"status\":\"Y\"}},\"acquirer\":{\"response\":{\"code\":\"00\",\"message\":\"Approved\"}},\"gateway\":{\"response\":{\"code\":\"0\",\"message\":\"Transaction Approved\"}},\"card\":{\"id\":\"card_2V741723717UcVF17Yh9O354\",\"object\":\"card\",\"first_six\":\"512345\",\"first_eight\":\"51234500\",\"scheme\":\"MASTERCARD\",\"brand\":\"MASTERCARD\",\"last_four\":\"0008\"},\"receipt\":{\"id\":\"202127230745103892\",\"email\":true,\"sms\":true},\"customer\":{\"id\":\"cus_TS02A4520230208p3P21710602\",\"first_name\":\"Majdi\",\"middle_name\":\"Alal\",\"last_name\":\"Alal\",\"email\":\"m.ghgjhgj@tap.company\",\"phone\":{\"country_code\":\"966\",\"number\":\"51234567\"}},\"source\":{\"object\":\"token\",\"type\":\"CARD_NOT_PRESENT\",\"payment_type\":\"CREDIT\",\"payment_method\":\"MASTERCARD\",\"channel\":\"INTERNET\",\"id\":\"tok_udpI1923445Jo1b27mi9I282\"},\"redirect\":{\"status\":\"PENDING\",\"url\":\"http://your_website.com/redirecturl\"},\"post\":{\"status\":\"PENDING\",\"url\":\"https://webhook.site/25c5e885-216b-4d5f-bcbf-8e5d0d20b76f\"},\"auto\":{\"status\":\"SCHEDULED\",\"type\":\"VOID\",\"time\":1},\"merchant\":{\"id\":\"25145693\"},\"description\":\"\",\"metadata\":{\"udf1\":\"test_data_1\",\"udf2\":\"test_data_2\",\"udf3\":\"test_data_3\"},\"payment_agreement\":{\"id\":\"payment_agreement_u6Xt2123445zy0z27yY9m684\",\"type\":\"UNSCHEDULED\",\"total_payments_count\":1,\"contract\":{\"id\":\"card_2V741723717UcVF17Yh9O354\",\"customer_id\":\"cus_TS02A4520230208p3P21710602\",\"type\":\"SAVED_CARD\"},\"metadata\":{\"txn_type\":\"AUTHORIZE\",\"txn_id\":\"auth_TS04A1720230745Rt2a2710607\",\"terminal_id\":\"ter_m1RM0420211322p4PH1002445\"}}}"
    }
}

Validate the webhook (hashstring)

You can ensure the secure webhook by calculating the "Hashstring" value received in the headers. If the 'hashstring' value match with the calculated value, means the post is secure and received by the Tap side.

Calculating and validating a hashstring

Collect the below values from the posted response (charge / authorize / invoice response)

Variable	Object	Description
id	charge/authorize/invoice	charge.id or authorize.id or invoice.id
amount	charge/authorize/invoice	charge.amount or authorize.amount or invoice.amount
Amount should be rounded with standard decimal value

(Ex: AED - 2.00, BHD - 3.000, KWD - 3.000, OMR - 3.000, QAR - 2.00, SAR - 2.00, USD - 2.00, EUR - 2.00, GBP - 2.00, EGP - 2.00)
currency	charge/authorize/invoice	charge.currency or authorize.currency or invoice.currency
gateway_reference	charge/authorize	charge.reference.gateway or authorize.reference.gateway
payment_reference	charge/authorize	charge.reference.payment or authorize.reference.payment
updated	invoice	invoice.updated
status	charge/authorize/invoice	charge.status or authorize.status or invoice.status
created	charge/authorize/invoice	charge.transaction.created or authorize.transaction.created or invoice.created
PHP
<?php
// Get the passed data from the post response (charge / authorize / refund / invoice response)

$id = 'charge.id or authorize.id or refund.id or invoice.id';
$amount = 'charge.amount or authorize.amount or refund.amount or invoice.amount';
$currency = 'charge.currency or authorize.currency or refund.currency or invoice.currency';
$gateway_reference = 'charge.reference.gateway or authorize.reference.gateway or refund.reference.gateway';
$payment_reference = 'charge.reference.payment or authorize.reference.payment or refund.reference.payment';
$updated = 'invoice.updated';
$status = 'charge.status or authorize.status or refund.status or invoice.status';
$created = 'charge.transaction.created or authorize.transaction.created or refunud.created or invoice.created';

// Your Secret API Key Provided by Tap
$SecretAPIKey = "sk_test_XKokBfNWv6FIYuTMg5sLPjhJ";


// Charges - Create a hashstring from the posted response data + the data that are related to you.
$toBeHashedString = 'x_id' . $id . 'x_amount' . $amount . 'x_currency' . $currency . 'x_gateway_reference' . $gateway_reference . 'x_payment_reference' . $payment_reference . 'x_status' . $status . 'x_created' . $created . '';

// Authorize or Void - Create a hashstring from the posted response data + the data that are related to you.
$toBeHashedString = "x_id" . $id . "x_amount" . $amount . "x_currency" . $currency . "x_gateway_reference" . $gateway_reference . "x_payment_reference" . $payment_reference . "x_status" . $status . "x_created" . $created . '';

// Refund - Create a hashstring from the posted response data + the data that are related to you.
$toBeHashedString = "x_id" . $id . "x_amount" . $amount . "x_currency" . $currency . "x_gateway_reference" . $gateway_reference . "x_payment_reference" . $payment_reference . "x_status" . $status . "x_created" . $created . '';

// Invoice - Create a hashstring from the posted response data + the data that are related to you.
$toBeHashedString = 'x_id' . $id . 'x_amount' . $amount . 'x_currency' . $currency . 'x_updated' . $updated . 'x_status' . $status . 'x_created' . $created . '';


// Create your hashstring by passing concatinated string and your secret API Key
$myHashString = hash_hmac('sha256', $toBeHashedString, $SecretAPIKey);

// Legitimate the post request by comparing the hashstring you computed with the one posted in the header
if ($myHashString == $postedHashString) {
    echo "Secure Post";
} else {
    echo "Insecure Post";
}


👍

Best Practise

While computing the hash string ensure that all parameters used are following the exact parameter specifications. The amount should be rounded with the standard decimal value (ISO Standard Currency Codes).

Updated 8 days ago

Magento
Redirect
Did this page help you?
Yes
No
TABLE OF CONTENTS
Webhook Requires
What are webhooks
When to use webhooks
Webhook Example for a Charges Response
Webhook Example for an Authorize Response
Validate the webhook (hashstring)

URL: https://developers.tap.company/docs/woocommerce

ACCEPTANCE
Saved Cards
Recurring Payments
SDK
Web Card SDK V1
Web Card SDK V2
PAYMENT METHODS
Overview of Payment Methods
Samsung Pay
Card Payments
Benefit Pay
Apple Pay
Cash Wallet
KNET
Mada
NAPS/QPay
STC Pay
BNPL
PLUGINS
Woocommerce
Magento
AFTER PAYMENT
Webhook
Redirect
MARKETPLACE
Overview
Getting Started
Onboarding Businesses
Split Payments
REFERENCES
User Access Permissions
INTEGRATIONS FLOW
Card Payments
Redirect Payments
Device Payments
Authorize and Capture
Recommendations & Best Practices
PLATFORM
Platforms Setups
Platforms Integration Concepts
Creating a Lead
Creating a Merchant Account
Creating a Transaction
REPORTS
Reports Download Concepts
Reports for Commerce Platforms
Woocommerce

Simplifying Tap Payments Integration for Your WooCommerce Store

To integrate your WordPress account with Tap, you first need to have a Tap account. Once your account has been registered, you'll be contacted by our onboarding team to help you select a price plan that works with your business needs and get your account activated.

Please login to your tap's merchant dashboard to get the plugin authentication keys, required for plugin configuration.
Sign in/up to your merchant dashboard, using your admin credentials, email & password.
Dashboard > goSell > API credentials
You’ll find a set of keys for Sandbox(testing) and Production(live) environments. Usually, both keys are required in the plugin configuration.
Plugin Installation

Important: Please make sure that woo commerce plugin is installed on your WordPress. The tap's payment plugin only works on top of woo-commerce functionalities.

Follow the installation steps below

Download the updated tap's wooCommerce plugin(zip file) from our GitHub repository.
Login to your WordPress admin panel, on the left menu bar >> click "Plugins" >> click "Add New" button from the top-left side of the page.
Upload the plugin zip file and install (by clicking the 'install now' option right after uploading the file).
(wait a moment, until you get the message "installed successfully")
Check the installed plugins list & find tap's plugin(you can also search keyword 'tap') >> and click 'activate' the plugin.
Plugin configuration
From the left menu bar on your WordPress >> click 'wooCommerce' >> Settings
Select Payments section >> and toggle on Payment Methods
Select Knet >> Enable the button >> Then click on Set Up to start the Integration.
(Note: Credit and Debit Cards are already enabled by default)
Enable the Tap Payments Module, and configure the plugin by putting the right details as required.
Title: Add your custom title(e.g: Credit & Debit cards)
Keys: Add both secret & publishable keys, for both sandbox & production fields. (you can get keys from the tap dashboard)
Test Mode: you can enable/disable test mode (disabling means, you are ready to accept live payments)
Return Page: Select a page you want your customers to return back on, right after completing a payment.
Finally, click save changes and you’re all set to test the payments on your website.
For any issues or difficulties, please reach our integration support team at "integrations@tap.company"

Updated 3 months ago

Tabby
Magento
Did this page help you?
Yes
No
TABLE OF CONTENTS
Plugin Installation
Plugin configuration


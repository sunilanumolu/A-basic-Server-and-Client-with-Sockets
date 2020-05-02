
import pywhatkit
#pip install pywhatkit
#python3 -m pip install --upgrade pip
#python3 -m pip intsall pywhatkit

pywhatkit.sendwhatmsg("+919876543210","This is a message",15,00)#Will open web.whatsapp.com at 14:59 and message will be sent at exactly 15:00

pywhatkit.info("Python",lines=3,speak=None)#Will give information about the topic

pywhatkit.playonyt("Python")#Will play the first YouTube video having "Python" in it

pywhatkit.search("Python")#Will perform a Google search

pywhatkit.showHistory()#Will show information of all the messages sent using this library

pywhatkit.shutdown(time=100)#Will shutdown the system in 100 seconds

pywhatkit.cancelShutdown()#Will cancel the scheduled shutdown
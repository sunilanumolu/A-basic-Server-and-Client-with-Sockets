import requests
from bs4 import BeautifulSoup as soup
import csv

books=[]
authors=[]
stars=[]
ratings=[]
prices=[]
links=[]

for x in range(5):
	page=requests.get("https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/#"+str(x+1))
	page_soup=soup(page.content,"html.parser")

	containers=page_soup.findAll("div",{"class":"zg_itemImmersion"})
	l=len(containers)

	for container in containers:
					if(container.img["alt"]!=None):
					   book=container.img["alt"]
					else:
					   book="Not Available" 
					if(container.a["href"]!=None):
					   ref="https://www.amazon.com"+container.a["href"]
					else:
					   ref="Not Available"  
					namu=container.find("a",{"class":"a-size-small a-link-child"})
					if(namu!=None): 
						writer=namu.text 
					else: 
						writer="Not Available"
					sar=container.find("i",{"class":"a-icon a-icon-star a-star-4-5"})
					if(sar!=None): 
						star=sar.text 
					else: 
						star="Not Available"
					rat=container.find("a",{"class":"a-size-small a-link-normal"})
					if(rat!=None): 
						rating=rat.text 
					else: 
						rating="Not Available"
					pri=container.find("span",{"class":"p13n-sc-price"})
					if(pri!=None): 
						price=pri.text.strip() 
					else: 
						price="Not Available"
					
					    
					books.append(book)
					links.append(ref)
					authors.append(writer)
					stars.append(star)
					ratings.append(rating)
					prices.append(price)
	                

with open("output/com_book.csv","w",newline='') as csvfile:
	datawriter = csv.writer(csvfile)
	datawriter.writerow(["Name","url","Author","Price","Number of Ratings","Average Rating"])
	for i in range(len(5*containers)):
		datawriter.writerow([books[i],links[i],authors[i],prices[i],ratings[i],stars[i]])
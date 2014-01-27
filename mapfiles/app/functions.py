from xlrd import open_workbook
from sys import argv
import time
from datetime import datetime
import json
import os


def readheader_xlsx(filepath,name_file):
	print filepath
	wb = open_workbook(os.path.join(filepath,name_file))
	#print wb
	valores=[]
	values_title=[]
	values_body=[]

	posicion_lat=0
	posicion_lng=0
	for s in wb.sheets():	
	 	for col in range(s.ncols):
	 		values_title.append(s.cell(0,col).value)
	 		if set(values_title[col]) == set('lng'):
	 			posicion_lng = col
	 		if set(values_title[col]) == set('lat'):
	 			posicion_lat = col
	 	print len(values_title)
	#return values_title
	valores.append(values_title);

	for s in wb.sheets():
		for row in range(s.nrows):
			if row == 0:
				continue
			elif row == 1:	
		 		for id_title in range(len(values_title)): 	
		 			values_body.append(s.cell(row,id_title).value);
		 		break
	valores.append(values_body);
	return valores





def xlsx2geojson(filepath,name_file):
	print filepath
	wb = open_workbook(os.path.join(filepath,name_file))
	#print wb
	geojson = { "type": "FeatureCollection", "features": [] }
	values_title=[]
	posicion_lat=0
	posicion_lng=0
	for s in wb.sheets():	
	 	for col in range(s.ncols):
	 		values_title.append(s.cell(0,col).value)
	 		if set(values_title[col]) == set('lng'):
	 			posicion_lng = col
	 		if set(values_title[col]) == set('lat'):
	 			posicion_lat = col
	 	print values_title
	 	print len(values_title)
	 	print posicion_lng
	 	print posicion_lat

	for s in wb.sheets():
		for row in range(s.nrows):
			if row == 0:
				continue
			else:	
		 		point = {
		        	"type": "Feature",
		        	"geometry": {
		            	"type": 'Point',
		            	"coordinates": []
		        	},
		        	"properties": { }
		        }
		 		for id_title in range(len(values_title)):
		 			if posicion_lat == id_title:
		 				 point['geometry']['coordinates'].append(s.cell(row,id_title).value)
		 			elif posicion_lng == id_title:
		 				 point['geometry']['coordinates'].append(s.cell(row,id_title).value) 		
					else:
						 point['properties'][values_title[id_title]] = s.cell(row,id_title).value				 
				geojson['features'].append(point)		 

	ts = time.time()
	print ts
	print 'saving geojson'
	nt= str(name_file).split('.')
   	nt= nt[0] + '.js'
	json.dump(geojson, open(os.path.join(filepath,nt), 'w'))

def xlsx2geojson_parameters(filepath,name_file,fields,lat,lng):
	wb = open_workbook(os.path.join(filepath,name_file))
	#print wb
	geojson = { "type": "FeatureCollection", "features": [] }
	values_title=[]
	posicion_lat=0
	posicion_lng=0
	for s in wb.sheets():	
	 	for col in range(s.ncols):
	 		values_title.append(s.cell(0,col).value)
	 		if set(values_title[col]) == set('lng'):
	 			posicion_lng = col
	 		if set(values_title[col]) == set('lat'):
	 			posicion_lat = col
	 	print values_title
	 	print len(values_title)
	 	print posicion_lng
	 	print posicion_lat

	for s in wb.sheets():
		for row in range(s.nrows):
			if row == 0:
				continue
			else:	
		 		point = {
		        	"type": "Feature",
		        	"geometry": {
		            	"type": 'Point',
		            	"coordinates": []
		        	},
		        	"properties": { }
		        }
		      
		 		for id_title in range(len(fields)):
		 			posicion=values_title.index(fields[id_title])
		 			point['properties'][fields[id_title]] = s.cell(row,posicion).value
		 			print point['properties'][fields[id_title]] 
		 			#if posicion_lat == id_title:fields
		 		posicion_lat=values_title.index(lat)
		 		posicion_lng=values_title.index(lng)
		 		point['geometry']['coordinates'].append(s.cell(row,posicion_lat).value)
		 		point['geometry']['coordinates'].append(s.cell(row,posicion_lng).value)
		 			#elif posicion_lng == id_title:
		 				 #point['geometry']['coordinates'].append(s.cell(row,id_title).value) 		
					#else:
					#	 point['properties'][values_title[id_title]] = s.cell(row,id_title).value				 
				geojson['features'].append(point)		 

	ts = time.time()
	print ts
	print 'saving geojson'
	nt= str(name_file).split('.')
   	nt= nt[0] + '.js'
	json.dump(geojson, open(os.path.join(filepath,nt), 'w'))



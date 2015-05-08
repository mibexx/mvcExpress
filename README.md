# CSV Oxid Exporter

Install Node
-----------------
> sudo apt-get install python-software-properties python g++ make  
> sudo add-apt-repository ppa:chris-lea/node.js  
> sudo apt-get update  
> sudo apt-get install nodejs  

Install CSV Oxid Exporter
--------------------------
> npm install

Starte CSV Oxid Exporter
---------------------------
> node ./bin/www [<staging|productive>]


Mit forever
=============================
> sudo npm install forever  
> forever -w start bin/www

Konsole
-----------
> forever list  
tail -f <Pfad-zur-Logdatei>


Aufrufen
================

Staging
-----------
http://127.0.0.1:7071

Productive
--------------
http://127.0.0.1:7070


Konfiguration
==================

Datenbank
-------------
Die Datei "secrets.example.js" im Verzeichnis "config" kopieren und "secrets.js" benennen.   
Dort die Datenbankdaten eintragen.

Port
------
Der Port kann in der Datei "config/index.js" geändert werden.
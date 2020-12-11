f = open("countries.txt", "r")
out = open("newcountries.txt", "w+")

Lines = f.readlines()

count = 0
# Strips the newline character
for line in Lines:
    count +=1

    s = line.find("ADMIN")
    country = line[s + 8:s + 200]
    print(country)
    s = country.find(",")
    country = country[:s]
    s = line.find("ISO_A2") + 9
    code = line[s:s + 4]
    print(code)
    s = line.find("coordinates") + 14
    coord = line[s + 4:]
    if coord.find("}")==-1:
        coord = line[s + 4:-7]
    else:
        coord = line[s + 4:-9]

    # outstring = "{"+"country: "+country+", code: "+code+", coordinates: "+coord+",\n"

    outstring = "(" + country + "," + code + ",\"" + coord + "\"),\n"
    if count<256:
        out.write(outstring)

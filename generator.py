import numpy as np
import random

items = ['apple','orange','banana','tomato','bratwurst']
genders = ['m','f']
moods = ['neutral', 'sadness', 'disgust', 'surprise', 'fear', 'happiness']

'''
template = "insert into sales values(DEFAULT, '"+item+"', "+str(qty)+", "+str(age)+", '"+gender+"', '"+mood+"', DEFAULT);"
'''

#apple
#apple is normally distributed with the mean age of 25

# ages = np.random.normal(25,5,200)
# for age in ages:
# 	template = "insert into sales values(DEFAULT, '"+"apple"+"', "+str(int(age+np.random.normal(5,2,1)[0]))+", "+str(int(age))+", '"+('m' if int(age)%2==0 else 'f')+"', '"+np.random.choice(moods)+"', DEFAULT);"
# 	print template;

#orange
#guys like orange more
# ages = np.random.uniform(18,55,200)
# for age in ages:
# 	template = "insert into sales values(DEFAULT, '"+"orange"+"', "+str(int(age))+", "+str(int(age))+", '"+('m' if random.random() > 0.25 else 'f')+"', '"+np.random.choice(moods)+"', DEFAULT);"
# 	print template;

#banana
#old people like banana more
# ages = np.random.uniform(18,55,200)
# for age in ages:
# 	template = "insert into sales values(DEFAULT, '"+"banana"+"', "+str(int(age))+", "+str(int(age))+", '"+('m' if random.random() > 0.5 else 'f')+"', '"+np.random.choice(moods)+"', DEFAULT);"
# 	print template;

#tomato
#girls like tomato more
# ages = np.random.uniform(18,55,400)
# for age in ages:
# 	template = "insert into sales values(DEFAULT, '"+"tomato"+"', "+str(int(age))+", "+str(int(np.random.uniform(15,20)))+", '"+'f'+"', '"+np.random.choice(moods)+"', DEFAULT);"
# 	print template;

#bratwurst
#correlates with age
ages = np.random.normal(18,10,400)
for age in ages:
	if age > 18:
		template = "insert into sales values(DEFAULT, '"+"bratwurst"+"', "+str(int(50 - age))+", "+str(int(age))+", '"+('f' if random.random() > 0.5 else 'm')+"', '"+np.random.choice(moods)+"', DEFAULT);"
		print template;

import pandas as pd

def merge_csv(df1, df2):
    # append the two dataframes keeping the original indexes
    merged = pd.concat([df1, df2], ignore_index=True)

    # save the merged dataframe as a new CSV file
    merged.to_csv('merged.csv', index=False)
    
def graph(df):
    import matplotlib.pyplot as plt

    # group the data by category and subcategory and count the number of contacts
    counts = df.groupby(['categoria', 'subcategoria']).size()

    # create a bar chart of the counts
    counts.plot(kind='bar')

    # set the axis labels and plot title
    plt.xlabel('Category/Subcategory')
    plt.ylabel('Number of contacts')
    plt.title('Distribution of contacts by category/subcategory')

    # display the plot
    plt.show()


# df1 = pd.read_csv("147_desratizacion.csv", delimiter=';')
# df2 = pd.read_csv("147_ruidos_molestos.csv", delimiter=';')
df = pd.read_csv("merged.csv")

# from merged.csv get all the different domicilio_barrio
barrios = df.domicilio_barrio.unique()
# print(len(barrios))



# GRAPH 1 - DONUT
data = pd.read_csv('147_desratizacion.csv', delimiter=';')
df_base = data[['domicilio_barrio', 'fecha_ingreso']]
# if the month is 11 drop it
df_base = df_base[df_base['fecha_ingreso'].str.contains('/11/') == False]
# make a df that has the domicilio_barrio and other column with quantity of appearances on df_base
df = df_base.groupby('domicilio_barrio').size().reset_index(name='counts')
others_count = df.loc[df['counts'] < 78, 'counts'].sum()

# add a new row to the dataframe with the sum of counts for domicilio_barrio with count less than 150
# df.loc[len(df)] = ['Otros', others_count]

# drop the rows with count less than 150
# df = df[df['counts'] >= 78]

df['domicilio_barrio'] = df['domicilio_barrio'].apply(lambda x: x.upper())

# save df to ratas_clean.csv
df.to_csv('rata_clean_total.csv', index=False)


#GRAPH 2 - RANKING
# get the ranking barrios with the most complaints. make a new df with columns of the months. the rows will be domicilio_barrio. the values of the cells will be the number of complaints for that month
import pandas as pd

# read in the data
df = df_base.copy()

# convert fecha_ingreso to a datetime object
df['fecha_ingreso'] = pd.to_datetime(df['fecha_ingreso'], format='%d/%m/%Y')

# extract the month from the date and create a new column
df['month'] = df['fecha_ingreso'].dt.month

# group the data by domicilio_barrio and month, and count the number of complaints
complaints_by_barrio_month = df.groupby(['domicilio_barrio', 'month']).size().reset_index(name='complaints')
# drop month 11
complaints_by_barrio_month = complaints_by_barrio_month[complaints_by_barrio_month['month'] != 11]

# create a pivot table to transform the data into the desired format
complaints_by_barrio_month_pivot = complaints_by_barrio_month.pivot(index='domicilio_barrio', columns='month', values='complaints')

# add a column to sum the total number of complaints for each barrio
complaints_by_barrio_month_pivot['total_complaints'] = complaints_by_barrio_month_pivot.sum(axis=1).astype(int)

# get the ranking of barrios with the most complaints
ranking_barrios = complaints_by_barrio_month_pivot.sort_values(by='total_complaints', ascending=False)

# drop the total_complaints column
ranking_barrios = ranking_barrios.drop(columns=['total_complaints'])

# replace month 1 to january, 2 to february, etc.
ranking_barrios = ranking_barrios.rename(columns={1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May'})

# replace NaN values with 0
ranking_barrios = ranking_barrios.fillna(0)
# make all values from each month int
ranking_barrios = ranking_barrios.astype(int)

#get only the top 5 barrios
ranking_barrios = ranking_barrios.head(5)

# print(ranking_barrios)
# save the ranking
ranking_barrios.to_csv('ranking_barrios.csv')



# GRAPH 3 - MAP

data = pd.read_csv('147_desratizacion.csv', delimiter=';')
# replace domicilio_barrio with uppercase
data['domicilio_barrio'] = data['domicilio_barrio'].str.upper()
# save the data
data.to_csv('map_ratas.csv', index=False)







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


df1 = pd.read_csv("147_desratizacion.csv", delimiter=';')
df2 = pd.read_csv("147_ruidos_molestos.csv", delimiter=';')
df = pd.read_csv("merged.csv")
graph(df)
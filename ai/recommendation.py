# recommendation.py

import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Dummy data for properties (normally, you'd get this from your database)
properties = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'feature1': [1.0, 2.0, 3.0, 4.0, 5.0],  # Example features (e.g., number of rooms, square footage, etc.)
    'feature2': [5.0, 4.0, 3.0, 2.0, 1.0]   # Example features (e.g., distance to city center, etc.)
})

# Simulate user preferences (dummy data)
user_features = np.array([[2.5, 3.5]])  # Example: a user profile with preferred feature values

# Fit the model using Nearest Neighbors
model = NearestNeighbors(n_neighbors=3).fit(properties[['feature1', 'feature2']])
distances, indices = model.kneighbors(user_features)

# Get recommended properties based on nearest neighbors
recommended_properties = properties.iloc[indices[0]]

# Print recommended properties
print("Recommended Properties:")
print(recommended_properties)

// Endpoints de la API

const API_BASE_URL = "https://api-polinizadores-9jhio69zl-iyahirmps-projects.vercel.app";

const API_ENDPOINTS = {
    SPECIES: (page) => `${API_BASE_URL}/species?_page=${page}&_per_page=10`,
    SPECIES_IMAGES: (id) => `${API_BASE_URL}/species-images/${id}`,
    SPECIES_CLASSIFICATION: (id) => `${API_BASE_URL}/classification/${id}`,
    SPECIES_DETAIL: (id) => `${API_BASE_URL}/species/${id}`,
    SPECIES_GRAPH_MONTH: (id) => `${API_BASE_URL}/graph-by-month/${id}`,
};

export default API_ENDPOINTS;
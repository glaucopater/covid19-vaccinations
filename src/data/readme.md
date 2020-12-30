#Json filter with the following query

// ver 1
\*.{
location: location,
total_vaccinations: data[?total_vaccinations!=null]
}[?length(total_vaccinations)>"0"].{location: location, tv: length(total_vaccinations), total_vaccinations: total_vaccinations[-1].total_vaccinations}

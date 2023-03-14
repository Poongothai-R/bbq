export default function LocationMap() {
  return (
    <div className="map">
      <iframe
        className="map-page"
        title="VeganRestaurant"
        loading="loading..."
        src="https://maps.google.com/maps?hl=en&amp;q=stallarholmen&amp;t=k&amp;z=17&amp;
                    ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
}

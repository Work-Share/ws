import { useState } from 'react';
import filter_data from '../data/filters.json';
import styles from './search.module.css';
import ListingCard from '../components/listing/card';

export default function Search() {
  // Date stuff
  const d = new Date();
  let rent_start = d.toISOString().split("T")[0];
  let rent_end = d.toISOString().split("T")[0];
  let today_string = d.toISOString().split("T")[0];

  // Update the cards to show based on filters
  const [filters, setFilters] = useState([]);
  const [displayCards, setDisplayCards] = useState([<p key='dummy_card'></p>]);
  const update_display = () => {
    // Check if listing has all filters
    let checker = (check, test) => {
      let res = true;
      check.forEach(item => {
        if (test.indexOf(item) == -1) {
          res = false;
        }
      });
      return res;
    }

    let new_cards = [];
    console.log(filters);
    fetchedListings.forEach(listing => {
      if (checker(filters, listing.amenities)) {
        new_cards.push(<ListingCard
          key={listing._id}
          id={listing._id}
          name={listing.name}
          rating={listing.price.$numberDecimal}
          img={listing.image_url}
          check_in={rentStart}
          check_out={rentEnd} />);
      }
    });
    setDisplayCards(new_cards);
  }

  // Filters stuff
  // Update user selected filters
  const update_filters = (e) => {
    let new_filters = filters.slice();
    if (e.target.checked) {
      new_filters.push(e.target.id);
    }
    else {
      new_filters.splice(new_filters.indexOf(e.target.id), 1);
    }

    filters = new_filters;
    setFilters(filters);
    if (fetchedListings.length > 0) {
      update_display();
    }
  }

  const filters_list = filter_data.filters.map((f) => {
    return [f.key, f.value];
  });
  const filters_html = [];
  filters_list.forEach((i) => {
    filters_html.push(
      <div className={styles.filter} key={i[0]}>
        <input type="checkbox" id={i[0]} onClick={(e) => {
          update_filters(e);
        }}></input>
        <label htmlFor={i[0]}>{i[1]}</label>
      </div>
    );
  });
  // State variables
  const [fetchedListings, setFetchedListings] = useState([]);
  const [filtersHtml, setFiltersHtml] = useState(filters_html);
  const [rentStart, setRentStart] = useState(rent_start);
  const [rentEnd, setRentEnd] = useState(rent_end);
  const [today, setToday] = useState(today_string);

  const on_search = async (e) => {
    e.preventDefault();

    let search_params = new URLSearchParams();
    search_params.append('count', '3');
    search_params.append('city', 'dallas');
    search_params.append('checkin', rentStart);
    search_params.append('checkout', rentEnd);
    const res = await fetch('/api/listings/get?' + search_params.toString(), {
      method: 'GET'
    });

    const data = await res.json();

    document.getElementById("num_fetched").classList.remove("hide");

    setFetchedListings(data.listings);
    update_display();
  }

  return (
    <div>
    <div className={styles.search_title}><h1>Find a Workspace</h1></div>
      <div className={styles.search_bar_container}>
        <form className={styles.search_bar_form}>
          <div className={styles.date}>
            <p>Rental Start</p>
            <input
              type="date" name="start" required value={rentStart} min={today}
              onChange={(e) => {
                if (e.target.value > rentEnd) {
                  setRentEnd(e.target.value);
                }
                setRentStart(e.target.value);
              }}
            >
            </input>
          </div>
          <div className={styles.date}>
            <p>Rental End</p>
            <input
              type="date" name="end" required value={rentEnd} min={rentStart}
              onChange={(e) => { setRentEnd(e.target.value); }}>
            </input>
          </div>
          <div className={styles.search_bar_submit_container}>
            <button className={styles.search_bar_submit} onClick={on_search}>Search</button>
          </div>
        </form>
      </div>
      <div className={styles.num_fetched + " hide"} id="num_fetched">
        {(fetchedListings.length > 0)
          ?
          <p>Fetched {fetchedListings.length} listings</p>
          :
          <p></p>
        }
      </div>
      <div className={styles.search_filters}>
        <h2>Filters</h2>
        <form>
          {filtersHtml}
        </form>
      </div>
      <div className={styles.search_container}>
        {(displayCards.length > 0)
          ?
          displayCards
          :
          (fetchedListings.length > 0)
            ?
            <p>No listings match the selected filters</p>
            :
            <p>Invalid time range</p>
        }
      </div>
    </div>
  );
}

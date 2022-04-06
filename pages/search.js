import ListingCard from '../components/listing/card';
import styles from "./search.module.css";
import React from 'react';
import filter_data from '../data/filters.json';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    const filters_list = filter_data.filters.map((f) => {
      return [f.key, f.value];
    });

    const d = new Date();
    let rent_start = d.toISOString().split("T")[0];
    let rent_end = d.toISOString().split("T")[0];

    this.state = {
      fetched_listings: [],
      display_cards: [<p key={'dummy_card'}></p>],
      filters: [],
      filters_html: [],
      rent_start: rent_start,
      rent_end: rent_end,
      today: d.toISOString().split("T")[0],
      loading: false
    }

    filters_list.forEach((i) => {
      this.state.filters_html.push(
        <div className={styles.filter} key={i[0]}>
          <input type="checkbox" id={i[0]} onClick={(e) => { this.update_filters(e); }}></input>
          <label htmlFor={i[0]}>{i[1]}</label>
        </div>
      );
    });
  }

  on_search = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    let search_params = new URLSearchParams();
    search_params.append('count', '3');
    search_params.append('city', 'dallas');
    search_params.append('checkin', this.state.rent_start);
    search_params.append('checkout', this.state.rent_end);
    const res = await fetch('/api/listings/get?' + search_params.toString(), {
      method: 'GET'
    });

    const data = await res.json();

    document.getElementById("num_fetched").classList.remove("hide");

    this.state.fetched_listings = data.listings;
    this.update_display();

    this.setState({ loading: false });
  }

  update_filters = (e) => {
    let new_filters = this.state.filters.slice();
    if (e.target.checked) {
      new_filters.push(e.target.id);
    }
    else {
      new_filters.splice(new_filters.indexOf(e.target.id), 1);
    }

    this.state.filters = new_filters;
    this.setState({ filters: this.state.filters });
    if (this.state.fetched_listings.length > 0) {
      this.update_display();
    }
  }

  /* Updates cards to display based on all filters */
  update_display = () => {
    // Check if listing has all filters
    console.log("Filters");
    console.log(this.state.filters);
    let checker = (check, test) => {
      let res = true;
      check.forEach(item => {
        if (test.indexOf(item) == -1) {
          res = false;
        }
      });
      if (res == false) {
        return false;
      }
      else {
        return true;
      }
    }

    let new_cards = [];
    this.state.fetched_listings.forEach(listing => {
      console.log(listing);
      if (checker(this.state.filters, listing.amenities)) {
        new_cards.push(<ListingCard
          url={"/listing/" + listing._id}
          key={listing._id}
          id={listing._id}
          name={listing.name}
          rating={listing.price.$numberDecimal}
          img={listing.image_url}
          check_in={this.state.rent_start}
          check_out={this.state.rent_end} />);
      }
    });
    this.setState({ display_cards: new_cards });
  }

  render() {
    return (
      <div>
        <div className={styles.search_title}><h1>Find a Workspace</h1></div>
        <div className={styles.search_bar_container}>
          <form className={styles.search_bar_form}>
            <div className={styles.date}>
              <p>Rental Start</p>
              <input
                type="date" name="start" required value={this.state.rent_start} min={this.state.today}
                onChange={(e) => {
                  if (e.target.value > this.state.rent_end) {
                    this.state.rent_end = e.target.value;
                  }
                  this.setState({ rent_start: e.target.value });
                }}
              >
              </input>
            </div>
            <div className={styles.date}>
              <p>Rental End</p>
              <input
                type="date" name="end" required value={this.state.rent_end} min={this.state.rent_start}
                onChange={(e) => { this.setState({ rent_end: e.target.value }); }}>
              </input>
            </div>
            <div className={styles.search_bar_submit_container}>
              <button className={styles.search_bar_submit} onClick={this.on_search}>Search</button>
            </div>
          </form>
        </div>
        <div className={styles.num_fetched + " hide"} id="num_fetched">
          {(this.state.fetched_listings.length > 0)
            ?
            <p>Fetched {this.state.fetched_listings.length} listings</p>
            :
            <p></p>
          }
        </div>
        <div className={styles.search_filters}>
          <h2>Filters</h2>
          <form>
            {this.state.filters_html}
          </form>
        </div>
        <div className={styles.search_container}>
          {(this.state.display_cards.length > 0)
            ?
            this.state.display_cards
            :
            (this.state.fetched_listings.length > 0)
              ?
              <p>No listings match the selected filters</p>
              :
              <p>Invalid time range</p>
          }
        </div>

        { this.state.loading ?
          <div className="loading">
            <p>Loading</p>
            <div className="lds_ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        :
        <div></div>
      }
      </div>
    );
  }
}
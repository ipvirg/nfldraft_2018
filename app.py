import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/nfldraft.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Nfl_Data = Base.classes.nfl_draft

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("position.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[1:])

@app.route("/pos_names")
def pos_names():
    """Return a list of position names"""
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    return jsonify(list(df["Pos_NFL"].unique()))
    
@app.route("/merged_list/<Team_Name>")
def merged_list(Team_Name):
    """Return the draft data for a given team."""
    sel = [
        Nfl_Data.Team_Name,
        Nfl_Data.Rnd,
        Nfl_Data.Pick,
        Nfl_Data.Name,
        Nfl_Data.Pos_NFL,
        Nfl_Data.College,
        Nfl_Data.Age,
    ]

    results = db.session.query(*sel).filter(Nfl_Data.Team_Name == Team_Name).all()

    # Create a dictionary entry for each row of metadata information
    team_tm = {}
    for result in results:
        team_tm["Team_Name"] = result[0]
        team_tm["Rnd"] = result[1]
        team_tm["Pick"] = result[2]
        team_tm["Name"] = result[3]
        team_tm["Pos_NFL"] = result[4]
        team_tm["College"] = result[5]
        team_tm["Age"] = result[6]

    print(team_tm)
    return jsonify(team_tm)


@app.route("/position_metadata/<pos>")
def position_metadata(pos):
    """Return Position Meta Data."""
    sel = [
        Nfl_Data.Pos_NFL,
        Nfl_Data.Rnd,
        Nfl_Data.Name,
        Nfl_Data.Yard_40,
        Nfl_Data.Bench_Press,
        Nfl_Data.Vert_Leap_in, 
        Nfl_Data.Broad_Jump_in,
    ]
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    results = db.session.query(*sel).filter(Nfl_Data.Pos_NFL==pos).all()

    # # Format the data to send as json
    pos_metadata = {}
    for result in results:
        pos_metadata["Position"] = result[0]
        pos_metadata["Round"] = result[1]
        pos_metadata["Name"] = result[2]
        pos_metadata["Yard_40"] = result[3]
        pos_metadata["Bench_Press"] = result[4]
        pos_metadata["Vert_Leap_in"] = result[5]
        pos_metadata["Broad_Jump_in"] = result[6]

    print(pos_metadata)
    return jsonify(pos_metadata)
    # data

@app.route("/position_test/<pos>")
def position_test(pos):
    """Return Player Name, Position, Round, Yard_40, Bench_Press, Vert_Leap_in, Broad_Jump_in."""
    sel = [
        Nfl_Data.Player_Name, 
        Nfl_Data.Pos_NFL,
        Nfl_Data.Rnd,
        Nfl_Data.Yard_40,
        Nfl_Data.Bench_Press,
        Nfl_Data.Vert_Leap_in, 
        Nfl_Data.Broad_Jump_in,
    ]

    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    # Filter the data based on position

    results = db.session.query(*sel).filter(Nfl_Data.Pos_NFL==pos).all()
    
  
    pos_data = {"Player_Name":[], 
                "Pos_NFL":[],
                "Round":[], 
                "Yard_40":[], 
                "Bench_Press":[],
                "Vert_Leap_in":[], 
                "Broad_Jump_in":[],
    }
    for result in results:

        pos_data["Player_Name"].append(result[0])
        pos_data["Pos_NFL"].append(result[1])
        pos_data["Round"].append(result[2])
        pos_data["Yard_40"].append(result[3])
        pos_data["Bench_Press"].append(result[4])
        pos_data["Vert_Leap_in"].append(result[5])
        pos_data["Broad_Jump_in"].append(result[6])

    return jsonify(pos_data)

if __name__ == "__main__":
    app.run()
